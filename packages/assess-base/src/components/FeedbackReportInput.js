import React, { useState, useEffect } from 'react'
import T from 'prop-types'
import { withStyles, Grid } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'graphql-hooks'
import get from 'lodash/get'

import { Form, Field } from 'formik'
import { TextField as FormikTextField } from 'formik-material-ui'
import { SectionTitle } from 'components'
import AutoSaveWatchFormik from './AutoSaveWatchFormik'
import SaveChip from './SaveChip'

function FeedbackReportInput({
  theme,
  classes,
  label,
  name,
  initialValue,
  dataFetchedTimestamp,
  assessmentId,
  mutation,
  canEdit,
  rows,
  pillarColor,
}) {
  const { t } = useTranslation()
  // If the value is null or '' from DB, uncontrolled TextArea prefers `undefined`
  const part = typeof initialValue === 'object'

  const defaultValue = part ? initialValue[label] : initialValue || undefined
  const [currentValue, setCurrentValue] = useState(defaultValue)
  // Keep the state synchronized if the data changed in the parent (where the watch is implemented)
  useEffect(() => setCurrentValue(defaultValue), [JSON.stringify(defaultValue)])

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
    <AutoSaveWatchFormik
      initialValues={{ [name]: currentValue }}
      initialValuesTimestamp={dataFetchedTimestamp}
      onSubmit={(values, actions) => handleSaveInput(values, actions)}
    >
      {({ saving }) => (
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
              <div className={classes.saveStatus}>
                <SaveChip dirty={saving} />
              </div>
            </Grid>
          </Grid>
        </Form>
      )}
    </AutoSaveWatchFormik>
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
