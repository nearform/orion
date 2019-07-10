import React, { useState } from 'react'
import T from 'prop-types'
import { withStyles, Grid, Button } from '@material-ui/core'
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
}) {
  // If the value is null or '' from DB, uncontrolled TextArea prefers `undefined`
  const [currentValue, setCurrentValue] = useState(initialValue || undefined)
  const [updateMutation] = useMutation(mutation)

  const handleSaveInput = async (values, { setSubmitting }) => {
    const value = values[name]

    const variables = {
      id: assessmentId,
      [name]: value,
    }

    const result = await updateMutation({ variables })

    const savedValue = get(
      result,
      `data.update_assessment.returning[0].${name}`
    )
    setCurrentValue(savedValue)
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
                className={classes.sectionTitle}
                barColor={theme.palette.secondary.main}
                gutterBottom
              >
                {label}
              </SectionTitle>
            </Grid>
            <Grid item xs>
              <Field
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
                Save Updates
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
  initialValue: T.string,
  assessmentId: T.number.isRequired,
  mutation: T.string.isRequired,
  rows: T.number.isRequired,
  canEdit: T.bool.isRequired,
}

export default withStyles(styles, { withTheme: true })(FeedbackReportInput)
