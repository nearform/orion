import React, { useState } from 'react'
import T from 'prop-types'
import { withStyles, Grid, Button } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'graphql-hooks'
import get from 'lodash/get'

import { Formik, Form, Field } from 'formik'
import { TextField as FormikTextField } from 'formik-material-ui'
import { SectionTitle } from 'components'

function FeedbackReportInput({
  theme,
  classes,
  label,
  name,
  initialValue,
  assessmentId,
  mutation,
  canEdit,
  rows,
  pillarColor,
}) {
  const { t } = useTranslation()
  // If the value is null or '' from DB, uncontrolled TextArea prefers `undefined`
  const part = typeof initialValue === 'object'
  const [currentValue, setCurrentValue] = useState(
    part ? initialValue[label] : initialValue || undefined
  )
  const [updateMutation] = useMutation(mutation)

  const handleSaveInput = async (values, { setSubmitting }) => {
    if (part) {
      initialValue[label] = values[name]
    }
    const value = part ? initialValue : values[name]

    const variables = {
      id: assessmentId,
      [name]: value,
    }

    const result = await updateMutation({ variables })

    const savedValue = get(
      result,
      `data.update_assessment.returning[0].${name}`
    )
    setCurrentValue(part ? savedValue[label] : savedValue)
    setSubmitting(false)
  }

  return (
    <Formik
      enableReinitialize
      initialValues={{ [name]: currentValue }}
      onSubmit={(values, actions) => handleSaveInput(values, actions)}
    >
      {({ isSubmitting, dirty }) => (
        <Form>
          <Grid container spacing={5}>
            <Grid item xs={3}>
              <SectionTitle
                key={label}
                className={classes.sectionTitle}
                barColor={pillarColor || theme.palette.secondary.main}
                gutterBottom
              >
                {t(label)}
              </SectionTitle>
            </Grid>
            <Grid item xs>
              <Field
                key={label}
                disabled={!canEdit}
                component={FormikTextField}
                name={name}
                multiline
                fullWidth
                rows={rows}
              />
            </Grid>
          </Grid>
          <Grid container justify="flex-end" spacing={5}>
            <Grid item>
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                disabled={!dirty || isSubmitting}
              >
                {t('Save Updates')}
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  )
}

const styles = theme => ({
  sectionTitle: {
    color: theme.palette.primary.dark,
  },
})

FeedbackReportInput.propTypes = {
  theme: T.object.isRequired,
  classes: T.object.isRequired,
  label: T.string.isRequired,
  name: T.string.isRequired,
  assessmentId: T.number.isRequired,
  mutation: T.string.isRequired,
  rows: T.number.isRequired,
  canEdit: T.bool.isRequired,
}

export default withStyles(styles, { withTheme: true })(FeedbackReportInput)
