import React, { useContext } from 'react'
import { AuthContext, PaddedContainer } from 'components'
import { useMutation } from 'graphql-hooks'
import { createArticleMutation } from '../../queries'
import { navigate } from '@reach/router'
import BoxControlLabel from '../BoxControlLabel'
import SEO from '../SEO'
import * as Yup from 'yup'
import { Formik, Form, Field } from 'formik'
import { RadioGroup } from 'formik-material-ui'
import {
  useMediaQuery,
  withStyles,
  Grid,
  Radio,
  Typography,
} from '@material-ui/core'
import { useStaticQuery, graphql } from 'gatsby'
import get from 'lodash/get'
import keyBy from 'lodash/keyBy'

const CustomRadioGroup = withStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    marginLeft: 0,
    marginRight: theme.spacing(2),
    '&>label': {
      marginLeft: 0,
      marginRight: theme.spacing(1),
    },
  },
}))(RadioGroup)

function CreateArticle({ classes }) {
  const { getUserTokenData } = useContext(AuthContext)
  const staticResult = useStaticQuery(graphql`
    {
      allKnowledgeTypes {
        nodes {
          key
          name
          orderIndex
          input_fields {
            key
            name
            type
          }
        }
      }
    }
  `)
  const knowledgeTypes = get(staticResult, 'allKnowledgeTypes.nodes')
  const knowledgeTypeMap = keyBy(knowledgeTypes, 'key')
  const [createArticle] = useMutation(createArticleMutation)
  const isSmUp = useMediaQuery('(min-width:600px)')

  const handleSelectType = async ({ knowledgeType }, actions) => {
    const { userId: creatorId } = getUserTokenData()
    const knowledgeTypeDefinition = get(
      knowledgeTypeMap,
      `${knowledgeType}.input_fields`
    )
    const fields = knowledgeTypeDefinition.map(field => ({
      ...field,
      value: null,
    }))
    //TODO: graceful error handling
    const {
      data: {
        insert_article: {
          returning: [{ id }],
        },
      },
    } = await createArticle({ variables: { knowledgeType, fields, creatorId } })

    actions.setSubmitting(false)
    navigate(`/my-content/edit/${id}`)
  }

  return (
    <PaddedContainer>
      <SEO title="Create Article" />
      <Grid container spacing={3} className={classes.mainWrapper}>
        <Grid item xs={12}>
          <Formik
            validationSchema={Yup.object().shape({
              knowledgeType: Yup.string().required(),
            })}
            onSubmit={handleSelectType}
          >
            {({ handleSubmit, submitForm, submitCount, isSubmitting }) => (
              <Form onSubmit={handleSubmit}>
                <Typography
                  color="secondary"
                  variant="h4"
                  className={classes.fieldLabel}
                >
                  Let’s start by selecting a knowledge type
                </Typography>
                <Field
                  name="knowledgeType"
                  label="Knowledge Type"
                  component={CustomRadioGroup}
                >
                  {knowledgeTypes.map(({ key, name }) => (
                    <BoxControlLabel
                      key={key}
                      disabled={isSubmitting}
                      onChange={() => setImmediate(submitForm)}
                      value={key}
                      control={<Radio />}
                      label={name}
                    />
                  ))}
                </Field>
              </Form>
            )}
          </Formik>
        </Grid>
        {isSmUp && (
          <>
            <Grid item sm={4} lg={3}>
              <div className={classes.leftPlaceholder} />
            </Grid>
            <Grid item sm={8} lg={9}>
              <div className={classes.titlePlaceholder} />
              <div className={classes.subtitlePlaceholder} />
              <div className={classes.articlePlaceholder} />
            </Grid>
          </>
        )}
      </Grid>
    </PaddedContainer>
  )
}

export default withStyles(theme => ({
  mainWrapper: {
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
  fieldLabel: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  leftPlaceholder: {
    borderRadius: 3,
    backgroundColor: theme.palette.background.light,
    height: 530,
  },
  titlePlaceholder: {
    borderRadius: 3,
    width: 380,
    maxWidth: '100%',
    height: 40,
    opacity: 0.6,
    backgroundColor: theme.palette.background.dark,
  },
  subtitlePlaceholder: {
    borderRadius: 3,
    width: 304,
    maxWidth: '100%',
    height: 32,
    opacity: 0.6,
    backgroundColor: theme.palette.background.dark,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
  },
  articlePlaceholder: {
    borderRadius: 3,
    backgroundColor: theme.palette.background.light,
    height: 300,
    width: 690,
    maxWidth: '100%',
  },
}))(CreateArticle)
