import React from 'react'
import { useQuery, useMutation } from 'graphql-hooks'
import { Redirect } from '@reach/router'
import urlSlug from 'url-slug'
import UploadImageWidget from '../../UploadImageWidget'
import { useIsPlatformGroup, useUserId } from '../../../utils/auth'
import SEO from '../../SEO'
import { UserAvatar } from 'components'

import {
  getTaxonomyTypes,
  getArticleDetails,
  updateArticleMutation,
  addArticleTaxonomiesMutation,
  deleteArticleTaxonomiesMutation,
  addArticleAuthorsMutation,
  deleteArticleAuthorsMutation,
  deleteRecommendedArticlesMutation,
  addRecommendedArticlesMutation,
} from '../../../queries'
import { Formik, Form, Field, FastField } from 'formik'
import { fieldToCheckbox, TextField } from 'formik-material-ui'
import {
  Checkbox,
  withStyles,
  Radio,
  Grid,
  Typography,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import get from 'lodash/get'
import difference from 'lodash/difference'
import BoxControlLabel from '../../BoxControlLabel'
import SelectAuthor from './SelectAuthor'
import EditArticleButtons from './EditArticleButtons'
import ReviewArticleButtons from './ReviewArticleButtons'
import PublishedArticleButtons from './PublishedArticleButtons'
import SelectArticleRecommendations from './SelectArticleRecommendations'
import FormikRichTextEditor from './FormikRichTextEditor'

const path = path => obj => get(obj, path)

const diff = (previous, current) => [
  difference(current, previous),
  difference(previous, current),
]

function EditArticle({ classes, articleId }) {
  const isPlatformGroup = useIsPlatformGroup()
  const userId = useUserId()
  const [updateArticle] = useMutation(updateArticleMutation)
  const [addArticleTaxonomies] = useMutation(addArticleTaxonomiesMutation)
  const [deleteArticleTaxonomies] = useMutation(deleteArticleTaxonomiesMutation)
  const [addArticleAuthors] = useMutation(addArticleAuthorsMutation)
  const [deleteArticleAuthors] = useMutation(deleteArticleAuthorsMutation)
  const [addRecommendedArticles] = useMutation(addRecommendedArticlesMutation)
  const [deleteRecommendedArticles] = useMutation(
    deleteRecommendedArticlesMutation
  )

  const { data: taxonomyData } = useQuery(getTaxonomyTypes)
  const taxonomyTypes = get(taxonomyData, 'taxonomy_type', [])

  const { data: articleData, refetch: refetchArticle } = useQuery(
    getArticleDetails,
    {
      variables: {
        id: articleId,
      },
    }
  )
  const articleDetails = get(articleData, 'articleDetails')

  //TODO: nicer loading indication
  if (!articleDetails || !taxonomyTypes) return null

  //TODO: better handling of roles, reddirect to a article list page?
  if (
    !(
      articleDetails.created_by_id === userId &&
      articleDetails.status === 'in-progress'
    ) &&
    !isPlatformGroup
  ) {
    return <Redirect to="/my-content" noThrow />
  }

  const fieldsMap = articleDetails.fields.reduce((res, field) => {
    res[field.key] = field.value
    return res
  }, {})
  const initialValues = {
    knowledgeType: articleDetails.knowledge_type,
    authors: articleDetails.authors,
    title: articleDetails.title,
    subtitle: articleDetails.subtitle,
    summary: articleDetails.summary,
    fields: fieldsMap,
    thumbnail: articleDetails.thumbnail,
    banner: articleDetails.banner,
    recommendations: articleDetails.recommended_articles,
    taxonomy: articleDetails.taxonomy_items.reduce((res, item) => {
      res[item.taxonomy_id] = true
      return res
    }, []),
  }

  async function saveArticle(values, actions) {
    //just take taxonomy and knowledgeType out, so they are not submitted (yet)
    const {
      taxonomy,
      recommendations,
      authors, //eslint-disable-line no-unused-vars
      knowledgeType, //eslint-disable-line no-unused-vars
      fields,
      ...updatableFields
    } = values
    const mutationPromises = []
    const [addAuthors, removeAuthors] = diff(
      articleDetails.authors.map(path('author.id')),
      values.authors.map(path('author.id'))
    )
    if (addAuthors.length > 0) {
      const addAuthorsInsert = addAuthors.map(author_id => ({
        article_id: articleId,
        author_id,
      }))
      mutationPromises.push(
        addArticleAuthors({ variables: { addAuthors: addAuthorsInsert } })
      )
    }

    if (removeAuthors.length > 0) {
      const removeAuthorsDelete = removeAuthors.map(author_id => ({
        _and: [
          { article_id: { _eq: articleId } },
          { author_id: { _eq: author_id } },
        ],
      }))
      mutationPromises.push(
        deleteArticleAuthors({
          variables: { removeAuthors: removeAuthorsDelete },
        })
      )
    }
    const [addTaxonomies, removeTaxonomies] = diff(
      articleDetails.taxonomy_items.map(path('taxonomy_id')),
      Object.keys(taxonomy || {}).reduce((res, it) => {
        if (values.taxonomy[it]) {
          res.push(Number(it))
        }
        return res
      }, [])
    )

    if (addTaxonomies.length > 0) {
      const addTaxonomiesInsert = addTaxonomies.map(taxonomy_id => ({
        article_id: articleId,
        taxonomy_id,
      }))
      mutationPromises.push(
        addArticleTaxonomies({
          variables: { addTaxonomies: addTaxonomiesInsert },
        })
      )
    }
    if (removeTaxonomies.length > 0) {
      const removeTaxonomiesDelete = removeTaxonomies.map(taxonomy_id => ({
        _and: [
          { article_id: { _eq: articleId } },
          { taxonomy_id: { _eq: taxonomy_id } },
        ],
      }))
      mutationPromises.push(
        deleteArticleTaxonomies({
          variables: { removeTaxonomies: removeTaxonomiesDelete },
        })
      )
    }

    const [addRecommendations, removeRecommendations] = diff(
      articleDetails.recommended_articles.map(path('recommended_article.id')),
      recommendations.map(path('recommended_article.id'))
    )

    if (addRecommendations.length > 0) {
      const addRecommendationsInsert = addRecommendations.map(
        recommended_id => ({
          article_id: articleId,
          recommended_id,
        })
      )

      mutationPromises.push(
        addRecommendedArticles({
          variables: { addRecommendations: addRecommendationsInsert },
        })
      )
    }

    if (removeRecommendations.length > 0) {
      const removeRecommendationsDelete = removeRecommendations.map(
        recommended_id => ({
          _and: [
            { article_id: { _eq: articleId } },
            { recommended_id: { _eq: recommended_id } },
          ],
        })
      )
      mutationPromises.push(
        deleteRecommendedArticles({
          variables: { removeRecommended: removeRecommendationsDelete },
        })
      )
    }

    const storeFields = articleDetails.fields.map(field => {
      return {
        ...field,
        value: fields[field.key],
      }
    })
    mutationPromises.push(
      updateArticle({
        variables: {
          id: articleId,
          changes: {
            ...updatableFields,
            fields: storeFields,
            path: urlSlug(`${articleId}-${updatableFields.title}`),
            updated_at: new Date(),
          },
        },
      })
    )
    await Promise.all(mutationPromises)
    await refetchArticle()

    actions.setSubmitting(false)
  }

  return (
    <>
      <SEO title={`Edit Article - ${articleDetails.title}`} />
      <Formik initialValues={initialValues} onSubmit={saveArticle}>
        {({
          values,
          handleSubmit,
          isSubmitting,
          submitForm,
          setFieldValue,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Grid container spacing={7}>
              <Grid item xs={3}>
                <Grid
                  container
                  spacing={1}
                  className={classes.knowledgeTypeContainer}
                  justify="space-between"
                >
                  <Grid item xs>
                    <Typography color="secondary" variant="h4">
                      knowledge type
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <BoxControlLabel
                      className={classes.selectedContentType}
                      control={<Radio checked disabled />}
                      label={values.knowledgeType}
                    />
                  </Grid>
                  <Grid item xs={12} className={classes.spacer}></Grid>
                  {articleDetails.status === 'in-progress' && (
                    <EditArticleButtons
                      submitArticle={() => {
                        setFieldValue('status', 'in-review')
                        setImmediate(submitForm)
                      }}
                    />
                  )}
                  {articleDetails.status === 'in-review' && (
                    <ReviewArticleButtons
                      publishArticle={() => {
                        setFieldValue('status', 'published')
                        setFieldValue('published_at', new Date())
                        setImmediate(submitForm)
                      }}
                    />
                  )}
                  {articleDetails.status === 'published' && (
                    <PublishedArticleButtons />
                  )}
                </Grid>

                <Grid item>
                  <ExpansionPanel expanded className={classes.expansionPanel}>
                    <ExpansionPanelSummary
                      className={classes.expansionSummary}
                      IconButtonProps={{ size: 'small' }}
                      expandIcon={<ExpandMoreIcon />}
                    >
                      <Typography variant="h3">Author</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={classes.expansionDetails}>
                      <div>
                        {values.authors.map(({ author }) => (
                          <UserAvatar
                            key={author.id}
                            user={author}
                            className={classes.author}
                          />
                        ))}
                      </div>
                      <SelectAuthor
                        selectedUsers={values.authors}
                        onChange={authors => setFieldValue('authors', authors)}
                      />
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                  {taxonomyTypes.map(type => (
                    <ExpansionPanel
                      key={type.key}
                      expanded
                      className={classes.expansionPanel}
                    >
                      <ExpansionPanelSummary
                        className={classes.expansionSummary}
                        IconButtonProps={{ size: 'small' }}
                        expandIcon={<ExpandMoreIcon />}
                      >
                        <Typography variant="h3">{type.name}</Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails
                        className={classes.expansionDetails}
                      >
                        {type.taxonomy_items.map(item => (
                          <Field
                            key={item.key}
                            name={`taxonomy.${item.id}`}
                            render={props => (
                              <BoxControlLabel
                                control={
                                  <Checkbox
                                    {...fieldToCheckbox(props)}
                                    disabled={false}
                                  />
                                }
                                label={item.name}
                              />
                            )}
                          />
                        ))}
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  ))}
                </Grid>
              </Grid>
              <Grid item xs={7}>
                <Field
                  name="title"
                  component={TextField}
                  fullWidth
                  placeholder="Add Title"
                  className={classes.titleInput}
                />
                <Field
                  name="subtitle"
                  component={TextField}
                  fullWidth
                  placeholder="Add Subtitle"
                  className={classes.subtitleInput}
                />
                <div className={classes.fieldLabel}>
                  <UploadImageWidget
                    path={`uploads/articles/${articleId}`}
                    value={values.banner}
                    onChange={s3key => {
                      setFieldValue('banner', s3key)
                      setImmediate(submitForm)
                    }}
                  />
                </div>
                <div>
                  <Typography
                    color="secondary"
                    variant="h4"
                    className={classes.fieldLabel}
                  >
                    Summary
                  </Typography>
                  <Field
                    name={'summary'}
                    component={FormikRichTextEditor}
                    articleId={articleId}
                  />
                </div>
                {articleDetails.fields.map(({ key, name, type }) => (
                  <div key={key}>
                    <Typography
                      color="secondary"
                      variant="h4"
                      className={classes.fieldLabel}
                    >
                      {name}
                    </Typography>
                    {type === 'rich-text' ? (
                      <FastField
                        name={`fields.${key}`}
                        component={FormikRichTextEditor}
                        articleId={articleId}
                      />
                    ) : null}
                    {type === 'image' ? (
                      <UploadImageWidget
                        path={`uploads/articles/${articleId}`}
                        value={values.fields[key]}
                        onChange={s3key => {
                          setFieldValue(`fields.${key}`, s3key)
                          setImmediate(submitForm)
                        }}
                      />
                    ) : null}
                  </div>
                ))}
                <div>
                  <Typography
                    color="secondary"
                    variant="h4"
                    className={classes.fieldLabel}
                  >
                    Recommendations for further reading
                  </Typography>
                  <SelectArticleRecommendations
                    onChange={articles =>
                      setFieldValue('recommendations', articles)
                    }
                    selectedArticles={values.recommendations}
                  />
                </div>
              </Grid>
              <Grid item xs={2} className={classes.rightToolbar}>
                {/*todo better handling of disabled fields}*/}
                <div className={classes.fieldLabel}>
                  <UploadImageWidget
                    alwaysShowBox
                    path={`uploads/articles/${articleId}`}
                    value={values.thumbnail}
                    onChange={s3key => {
                      setFieldValue('thumbnail', s3key)
                      setImmediate(submitForm)
                    }}
                  />
                  <div>
                    <Typography variant="caption">
                      This image will be used in categories, search results and
                      in search engines.
                    </Typography>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default withStyles(theme => ({
  selectedContentType: {
    margin: 0,
  },
  rightToolbar: {
    paddingRight: [0, '!important'],
    paddingLeft: [0, '!important'],
  },
  titleInput: {
    '& input': {
      ...theme.articleTypography.heading1,
      '&::-webkit-input-placeholder': { color: theme.palette.primary.dark },
      '&::-moz-placeholder': { color: theme.palette.primary.dark },
      '&:-ms-input-placeholder': { color: theme.palette.primary.dark },
      margin: 0,
      padding: `${theme.spacing(0.5)}px 0px`,
    },
    '&>div': {
      backgroundColor: 'transparent',
    },
  },
  subtitleInput: {
    '&>div': {
      backgroundColor: 'transparent',
    },
    '& input': {
      ...theme.articleTypography.heading2,
      '&::-webkit-input-placeholder': { color: theme.palette.primary.dark },
      '&::-moz-placeholder': { color: theme.palette.primary.dark },
      '&:-ms-input-placeholder': { color: theme.palette.primary.dark },
      margin: 0,
      padding: `${theme.spacing(0.5)}px 0px`,
    },
    marginTop: theme.spacing(-0.5),
  },
  fieldLabel: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  spacer: {
    '&:before': {
      content: '""',
      display: 'block',
      height: theme.spacing(1),
      backgroundColor: theme.palette.primary.dark,
      width: '100%',
    },
  },
  knowledgeTypeContainer: {
    '&>*>*': {
      width: '100%',
      height: '100%',
      minWidth: 0,
    },
  },

  expansionPanel: {
    backgroundColor: theme.palette.background.light,
    marginTop: `${theme.spacing(2)}px !important`,
  },
  expansionSummary: {
    padding: `${theme.spacing(1.5)}px ${theme.spacing(2)}px`,
    minHeight: '0 !important',
    '&>div:first-child': {
      margin: 0,
    },
    color: theme.articleTypography.heading3.color,
    '& svg': {
      color: theme.articleTypography.heading3.color,
    },
  },
  expansionDetails: {
    padding: theme.spacing(2),
    flexDirection: 'column',
    paddingTop: 0,
  },
  author: {
    '&:not(:first-child)': {
      marginTop: theme.spacing(1),
    },
  },
}))(EditArticle)
