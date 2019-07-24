import React, { useRef, useState } from 'react'
import { UserAvatar, RichTextEditor } from 'components'
import { useQuery, useMutation } from 'graphql-hooks'
import { Redirect } from '@reach/router'
import urlSlug from 'url-slug'
import { getCKEUploaderPlugin } from '../utils/imageUpload'
import UploadImageWidget from './UploadImageWidget'
import { getUserRolesSync, getUserIdSync } from '../utils/auth'
import SEO from '../components/SEO'
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
import get from 'lodash/get'
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
  const [updateArticle] = useMutation(updateArticleMutation)
  const [addArticleTaxonomies] = useMutation(addArticleTaxonomiesMutation)
  const [deleteArticleTaxonomies] = useMutation(deleteArticleTaxonomiesMutation)
  const [addArticleAuthors] = useMutation(addArticleAuthorsMutation)
  const [deleteArticleAuthors] = useMutation(deleteArticleAuthorsMutation)

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
    taxonomy: articleDetails.taxonomy_items.reduce((res, item) => {
      res[item.taxonomy_id] = true
      return res
    }, []),
  }

  async function saveArticle(values, actions) {
    //just take taxonomy and knowledgeType out, so they are not submitted (yet)
    const {
      taxonomy,
      authors, //eslint-disable-line no-unused-vars
      knowledgeType, //eslint-disable-line no-unused-vars
      fields,
      ...updatableFields
    } = values

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
      <SEO title={`Edit Article - ${articleDetails.id}`} />
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
              </Grid>
              <Grid item xs={2} className={classes.rightToolbar}>
                {/*todo better handling of disabled fields}*/}
                <div className={classes.fieldLabel}>
                  <UploadImageWidget
                    path={`uploads/articles/${articleId}`}
                    value={values.thumbnail}
                    onChange={s3key => {
                      setFieldValue('thumbnail', s3key)
                      setImmediate(submitForm)
                    }}
                  />
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
}))(CreateArticle)
