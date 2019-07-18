import React, { useRef, useState } from 'react'
import { UserAvatar, RichTextEditor } from 'components'
import { useQuery, useMutation } from 'graphql-hooks'
import { Redirect } from '@reach/router'
import urlSlug from 'url-slug'
import { getCKEUploaderPlugin } from '../utils/imageUpload'
import UploadImageWidget from './UploadImageWidget'
import { getUserRolesSync, getUserIdSync } from '../utils/auth'
import {
  getTaxonomyTypes,
  getArticleDetails,
  updateArticleMutation,
  addArticleTaxonomiesMutation,
  deleteArticleTaxonomiesMutation,
  addArticleAuthorsMutation,
  deleteArticleAuthorsMutation,
} from '../queries'
import { Formik, Form, Field, FastField } from 'formik'
import { fieldToCheckbox, TextField } from 'formik-material-ui'
import {
  Checkbox,
  withStyles,
  Radio,
  Button,
  Grid,
  Typography,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { useStaticQuery, graphql } from 'gatsby'
import get from 'lodash/get'
import keyBy from 'lodash/keyBy'
import debounce from 'lodash/debounce'
import difference from 'lodash/difference'
import BoxControlLabel from '../components/BoxControlLabel'
import SelectAuthor from './SelectAuthor'
const FormikRichTextEditor = ({
  field: { name, value, onChange }, // { name, value, onChange, onBlur }
  articleId,
  ...props
}) => {
  const ref = useRef()
  function dispatchChangeEvent(d) {
    if (ref.current) {
      var ev = new Event('input')
      ev.simulated = true
      ref.current.value = d
      ref.current.dispatchEvent(ev)
      onChange({ ...ev, target: ref.current })
    }
  }
  return (
    <>
      <RichTextEditor
        onChange={debounce(dispatchChangeEvent, 150)}
        {...props}
        data={value}
        config={{
          extraPlugins: [getCKEUploaderPlugin(`uploads/articles/${articleId}`)],
        }}
      />
      <input type="hidden" name={name} ref={ref} />
    </>
  )
}

function CreateArticle({ classes, articleId }) {
  //fetch all knowledge types so we can implement knowledge type changing in the future
  const staticResult = useStaticQuery(graphql`
    {
      allKnowledgeTypes {
        nodes {
          key
          name
          orderIndex
          disable
          input_fields {
            key
            name
            type
          }
        }
      }
    }
  `)
  const [updateArticle] = useMutation(updateArticleMutation)
  const [addArticleTaxonomies] = useMutation(addArticleTaxonomiesMutation)
  const [deleteArticleTaxonomies] = useMutation(deleteArticleTaxonomiesMutation)
  const [addArticleAuthors] = useMutation(addArticleAuthorsMutation)
  const [deleteArticleAuthors] = useMutation(deleteArticleAuthorsMutation)
  const knowledgeTypes = get(staticResult, 'allKnowledgeTypes.nodes')
  const knowledgeTypeMap = keyBy(knowledgeTypes, 'key')

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

  const [publishModalOpen, setPublishModalOpen] = useState(false)
  //TODO: nicer loading indication
  if (!articleDetails || !taxonomyTypes) return null

  //TODO: better handling of roles, reddirect to a article list page?
  if (
    (articleDetails.created_by_id !== Number(getUserIdSync()) ||
      articleDetails.status !== 'in-progress') &&
    !getUserRolesSync().includes('platform-admin')
  ) {
    return <Redirect to="/my-content" noThrow />
  }

  const initialValues = {
    knowledgeType: articleDetails.knowledge_type,
    authors: articleDetails.authors,
    title: articleDetails.title,
    subtitle: articleDetails.subtitle,
    summary: articleDetails.summary,
    fields: articleDetails.fields,
    image: articleDetails.image,
    taxonomy: articleDetails.taxonomy_items.reduce((res, item) => {
      res[item.taxonomy_id] = true
      return res
    }, []),
  }

  async function saveArticle(values, actions) {
    //just take taxonomy and knowledgeType out, so they are not submitted (yet)
    const { taxonomy, authors, knowledgeType, ...updatableFields } = values //eslint-disable-line no-unused-vars

    const mutationPromises = []

    const extracted_authors = values.authors.map(({ author: { id } }) => id)
    const previous_authors = articleDetails.authors.map(
      ({ author: { id } }) => id
    )

    const addAuthors = difference(extracted_authors, previous_authors).map(
      author_id => ({
        article_id: articleId,
        author_id,
      })
    )
    if (addAuthors.length > 0) {
      mutationPromises.push(addArticleAuthors({ variables: { addAuthors } }))
    }

    const removeAuthors = difference(previous_authors, extracted_authors).map(
      author_id => ({
        _and: [
          { article_id: { _eq: articleId } },
          { author_id: { _eq: author_id } },
        ],
      })
    )
    if (removeAuthors.length > 0) {
      mutationPromises.push(
        deleteArticleAuthors({
          variables: { removeAuthors },
        })
      )
    }

    const extracted_taxonomy = Object.keys(taxonomy || {}).reduce((res, it) => {
      if (values.taxonomy[it]) {
        res.push(Number(it))
      }
      return res
    }, [])

    const previous_taxonomy = articleDetails.taxonomy_items.map(
      t => t.taxonomy_id
    )
    const addTaxonomies = difference(extracted_taxonomy, previous_taxonomy).map(
      taxonomy_id => ({
        article_id: articleId,
        taxonomy_id,
      })
    )
    if (addTaxonomies.length > 0) {
      mutationPromises.push(
        addArticleTaxonomies({ variables: { addTaxonomies } })
      )
    }
    const removeTaxonomies = difference(
      previous_taxonomy,
      extracted_taxonomy
    ).map(taxonomy_id => ({
      _and: [
        { article_id: { _eq: articleId } },
        { taxonomy_id: { _eq: taxonomy_id } },
      ],
    }))
    if (removeTaxonomies.length > 0) {
      mutationPromises.push(
        deleteArticleTaxonomies({
          variables: { removeTaxonomies },
        })
      )
    }

    mutationPromises.push(
      updateArticle({
        variables: {
          id: articleId,
          changes: {
            ...updatableFields,
            path: urlSlug(`${articleId}-${updatableFields.title}`),
          },
        },
      })
    )
    await Promise.all(mutationPromises)
    await refetchArticle()

    actions.setSubmitting(false)
  }

  const isFieldEnabled = (values, fieldname) =>
    !get(knowledgeTypeMap[values.knowledgeType], 'disabled', []).includes(
      fieldname
    ) || undefined
  return (
    <>
      <Formik initialValues={initialValues} onSubmit={saveArticle}>
        {({
          values,
          handleSubmit,
          isSubmitting,
          submitForm,
          setFieldValue,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Grid container spacing={7} className={classes.sidebar}>
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
                  <Grid item xs={6}>
                    <Button variant="outlined" color="secondary" type="submit">
                      Save Draft
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => setPublishModalOpen(true)}
                    >
                      Submit
                    </Button>
                    <Dialog
                      open={publishModalOpen}
                      onClose={() => setPublishModalOpen(false)}
                    >
                      <DialogTitle id="alert-dialog-title">
                        {'Publish Article?'}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          {/* TODO: better text? */}
                          After submitting the article you will no longer be
                          able to edit it.
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button
                          onClick={() => setPublishModalOpen(false)}
                          color="secondary"
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={() => {
                            setFieldValue('status', 'in-review')
                            setImmediate(submitForm)
                            setPublishModalOpen(false)
                          }}
                          color="primary"
                        >
                          Submit for review
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </Grid>
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
              <Grid item xs={8}>
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
                {/*todo better handling of disabled fields}*/}
                {isFieldEnabled('image') && (
                  <div className={classes.fieldLabel}>
                    <UploadImageWidget
                      path={`uploads/articles/${articleId}`}
                      value={values.image}
                      onChange={s3key => {
                        setFieldValue('image', s3key)
                        setImmediate(submitForm)
                      }}
                    />
                  </div>
                )}

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
                {knowledgeTypeMap[values.knowledgeType].input_fields.map(
                  ({ key, name, type }) => (
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
                  )
                )}
              </Grid>
              <Grid item xs={1}></Grid>
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
}))(CreateArticle)
