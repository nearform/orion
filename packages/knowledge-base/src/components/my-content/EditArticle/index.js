import React, { useContext } from 'react'
import { useQuery, useMutation } from 'graphql-hooks'
import { Redirect } from '@reach/router' // eslint-disable-line import/no-extraneous-dependencies
import urlSlug from 'url-slug'
import * as Yup from 'yup'
import {
  ArticleStatusChip,
  AuthContext,
  EmbeddedVideo,
  PaddedContainer,
  UploadImageWidget,
  UserAvatar,
} from 'components'
import {
  Checkbox,
  withStyles,
  Grid,
  Typography,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
} from '@material-ui/core'
import { Formik, Form, Field, FastField } from 'formik'
import { fieldToCheckbox, TextField } from 'formik-material-ui'
import get from 'lodash/get'
import difference from 'lodash/difference'

import { constructImageUrl } from '../../../utils/image'

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

import BoxControlLabel from '../../BoxControlLabel'
import Seo from '../../Seo'
import SelectAuthor from './SelectAuthor'
import EditArticleButtons from './EditArticleButtons'
import ReviewArticleButtons from './ReviewArticleButtons'
import PublishedArticleButtons from './PublishedArticleButtons'
import PreviewArticleButton from './PreviewArticleButton'
import SelectArticleRecommendations from './SelectArticleRecommendations'
import FormikRichTextEditor from './FormikRichTextEditor'

const path = path => obj => get(obj, path)

const diff = (previous, current) => [
  difference(current, previous),
  difference(previous, current),
]

const ArticleSchema = Yup.object().shape({
  title: Yup.string().required('Please enter a title'),
  subtitle: Yup.string().required('Please enter a subtitle'),
})

function EditArticle({ classes, articleId }) {
  const { getUserTokenData } = useContext(AuthContext)
  const { userId, isPlatformGroup } = getUserTokenData()
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

  // TODO: nicer loading indication
  if (!articleDetails || !taxonomyTypes) return null

  // TODO: better handling of roles, redirect to a article list page?
  if (
    !(
      articleDetails.created_by_id === userId &&
      articleDetails.status === 'in-progress'
    ) &&
    !isPlatformGroup
  ) {
    return <Redirect noThrow to="/my-content" />
  }

  const fieldsMap = articleDetails.fields.reduce((res, field) => {
    res[field.key] = field.value
    return res
  }, {})
  const initialValues = {
    knowledgeType: articleDetails.knowledge_type,
    authors: articleDetails.authors,
    title: articleDetails.title || '',
    subtitle: articleDetails.subtitle || '',
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
    // Just take taxonomy and knowledgeType out, so they are not submitted (yet)
    const {
      taxonomy,
      recommendations,
      authors,
      knowledgeType,
      fields,
      ...updatableFields
    } = values
    const mutationPromises = []
    const [addAuthors, removeAuthors] = diff(
      articleDetails.authors.map(path('author.id')),
      values.authors.map(path('author.id'))
    )
    if (addAuthors.length > 0) {
      const addAuthorsInsert = addAuthors.map(authorId => ({
        article_id: articleId, // eslint-disable-line camelcase
        author_id: authorId, // eslint-disable-line camelcase
      }))
      mutationPromises.push(
        addArticleAuthors({ variables: { addAuthors: addAuthorsInsert } })
      )
    }

    if (removeAuthors.length > 0) {
      const removeAuthorsDelete = removeAuthors.map(authorId => ({
        _and: [
          { article_id: { _eq: articleId } }, // eslint-disable-line camelcase
          { author_id: { _eq: authorId } }, // eslint-disable-line camelcase
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
      const addTaxonomiesInsert = addTaxonomies.map(taxonomyId => ({
        article_id: articleId, // eslint-disable-line camelcase
        taxonomy_id: taxonomyId, // eslint-disable-line camelcase
      }))
      mutationPromises.push(
        addArticleTaxonomies({
          variables: { addTaxonomies: addTaxonomiesInsert },
        })
      )
    }

    if (removeTaxonomies.length > 0) {
      const removeTaxonomiesDelete = removeTaxonomies.map(taxonomyId => ({
        _and: [
          { article_id: { _eq: articleId } }, // eslint-disable-line camelcase
          { taxonomy_id: { _eq: taxonomyId } }, // eslint-disable-line camelcase
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
        recommendedId => ({
          article_id: articleId, // eslint-disable-line camelcase
          recommended_id: recommendedId, // eslint-disable-line camelcase
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
        recommendedId => ({
          _and: [
            { article_id: { _eq: articleId } }, // eslint-disable-line camelcase
            { recommended_id: { _eq: recommendedId } }, // eslint-disable-line camelcase
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
            updated_at: new Date(), // eslint-disable-line camelcase
          },
        },
      })
    )
    await Promise.all(mutationPromises)
    await refetchArticle()

    actions.setSubmitting(false)
  }

  // Code block below allows for old saved video articles to contain a video description field
  if (
    articleDetails.fields.some(({ key }) => key === 'video') &&
    !articleDetails.fields.some(({ key }) => key === 'description')
  ) {
    articleDetails.fields.push({
      key: 'description',
      type: 'rich-text',
      name: 'video description',
      value: '',
    })
  }

  return (
    <PaddedContainer>
      <Seo
        title={
          articleDetails.title === null
            ? 'New Article'
            : `Edit Article - ${articleDetails.title}`
        }
      />
      <Formik
        initialValues={initialValues}
        validationSchema={ArticleSchema}
        onSubmit={saveArticle}
      >
        {({ values, dirty, handleSubmit, submitForm, setFieldValue }) => {
          const saveButtons = (
            <>
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
            </>
          )

          return (
            <Form onSubmit={handleSubmit}>
              <Grid container spacing={7} className={classes.mainWrapper}>
                <Grid item xs={12} sm={4} lg={3}>
                  <Grid
                    container
                    spacing={1}
                    className={classes.knowledgeTypeContainer}
                    justify="space-between"
                  >
                    <Grid item xs>
                      <div className={classes.statusContainer}>
                        <Typography color="secondary" variant="h4">
                          knowledge type
                        </Typography>
                        <Typography
                          variant="h4"
                          className={classes.knowledgeType}
                        >
                          {values.knowledgeType}
                        </Typography>
                      </div>
                      <div className={classes.statusContainer}>
                        <Typography color="secondary" variant="h4">
                          status
                        </Typography>
                        <ArticleStatusChip status={articleDetails.status} />
                      </div>
                    </Grid>
                    <Grid item xs={12} className={classes.spacer} />
                    {saveButtons}
                  </Grid>

                  <Grid item>
                    <ExpansionPanel expanded className={classes.expansionPanel}>
                      <ExpansionPanelSummary
                        className={classes.expansionSummary}
                        IconButtonProps={{ size: 'small' }}
                      >
                        <Typography variant="h3">Author</Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails
                        className={classes.expansionDetails}
                      >
                        <div>
                          {values.authors.map(({ author }) => (
                            <UserAvatar
                              key={author.id}
                              user={author}
                              className={classes.author}
                              src={constructImageUrl(author.avatar)}
                            />
                          ))}
                        </div>
                        <SelectAuthor
                          selectedUsers={values.authors}
                          onChange={authors =>
                            setFieldValue('authors', authors)
                          }
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
                <Grid
                  container
                  item
                  spacing={7}
                  xs={12}
                  sm={8}
                  lg={9}
                  alignContent="flex-start"
                >
                  <Grid item xs={12} lg={9}>
                    <Field
                      fullWidth
                      name="title"
                      component={TextField}
                      placeholder="Add Title"
                      className={classes.titleInput}
                    />
                    <Field
                      fullWidth
                      name="subtitle"
                      component={TextField}
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
                        name="summary"
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
                        {type === 'embed-video-link' ? (
                          <>
                            <Field
                              fullWidth
                              name={`fields.${key}`}
                              component={TextField}
                              placeholder="Paste YouTube or Vimeo URL"
                            />
                            <EmbeddedVideo
                              url={values.fields[key]}
                              className={classes.embeddedVideo}
                            />
                          </>
                        ) : null}
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
                    <Grid
                      container
                      spacing={1}
                      className={classes.articleButtonsContainer}
                    >
                      {saveButtons}
                    </Grid>
                    <div>
                      <Typography
                        color="secondary"
                        variant="h4"
                        className={classes.fieldLabel}
                      >
                        Recommendations for further reading
                      </Typography>
                      <SelectArticleRecommendations
                        selectedArticles={values.recommendations}
                        onChange={articles =>
                          setFieldValue('recommendations', articles)
                        }
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12} lg={3} className={classes.rightToolbar}>
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
                          This image will be used in categories, search results
                          and in search engines.
                        </Typography>
                      </div>
                    </div>
                    <div>
                      <PreviewArticleButton
                        articleId={articleId}
                        dirty={dirty}
                        submitForm={submitForm}
                      />
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </Form>
          )
        }}
      </Formik>
    </PaddedContainer>
  )
}

export default withStyles(theme => ({
  mainWrapper: {
    marginBottom: theme.spacing(),
    marginTop: theme.spacing(1),
  },
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
  knowledgeType: {
    color: theme.articleTypography.heading2.color,
    fontWeight: '900',
    fontSize: 11,
    letterSpacing: 2.25,
    textTransform: 'uppercase',
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
  embeddedVideo: {
    marginTop: theme.spacing(1),
  },
  articleButtonsContainer: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    '& > div': {
      flexBasis: 'auto',
    },
  },
  statusContainer: {
    height: 'auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
    '&:last-child': {
      marginBottom: theme.spacing(0.5),
    },
  },
}))(EditArticle)
