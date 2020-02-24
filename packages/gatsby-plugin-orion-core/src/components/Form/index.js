import React from 'react'
import T from 'prop-types'
import { Grid, Button, withStyles } from '@material-ui/core'
import { Formik, Field } from 'formik'

import { InputField } from '../FormFields'

function Form({ classes, formFields = [], title, SubmitComponent, onSubmit }) {
  const values = formFields.reduce((a, field) => {
    a[field.name] = ''
    return a
  }, {})

  return (
    <Grid container spacing={2} justify="center">
      <Grid item xs={12}>
        {title}
      </Grid>
      <Grid item xs={12}>
        <Formik initialValues={values} onSubmit={onSubmit}>
          {props => {
            const {
              // Lines below are props that come from Formik therefore no prop-types needed
              // eslint-disable-next-line react/prop-types
              values,
              // eslint-disable-next-line react/prop-types
              errors,
              // eslint-disable-next-line react/prop-types
              touched,
              // eslint-disable-next-line react/prop-types
              handleChange,
              // eslint-disable-next-line react/prop-types
              isValid,
              // eslint-disable-next-line react/prop-types
              setFieldTouched,
              // eslint-disable-next-line react/prop-types
              handleSubmit,
            } = props

            const change = name => e => {
              e.persist()
              handleChange(e)
              setFieldTouched(name, true, false)
            }

            return (
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2} justify="center">
                  {formFields.map(
                    ({ name, xs, validate, label, ...formField }) => (
                      <Grid key={name} item xs={xs || 12}>
                        <Field
                          value={values[name]}
                          name={name}
                          validate={validate ? e => validate(e, values) : null}
                          onChange={change(name)}
                        >
                          {({ field }) => (
                            <InputField
                              fullWidth
                              error={touched[name] && errors[name]}
                              {...field}
                              {...formField}
                            >
                              {label}
                            </InputField>
                          )}
                        </Field>
                      </Grid>
                    )
                  )}
                  {SubmitComponent ? (
                    <SubmitComponent
                      disabled={!isValid}
                      className={classes.submit}
                    />
                  ) : (
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={!isValid}
                    >
                      Submit
                    </Button>
                  )}
                </Grid>
              </form>
            )
          }}
        </Formik>
      </Grid>
    </Grid>
  )
}

Form.propTypes = {
  formFields({ formFields }) {
    if (formFields.filter(({ name }) => name).length !== formFields.length) {
      return new Error(
        'Invalid prop, every object in the form fields array requires a name property'
      )
    }

    if (
      formFields
        .map(({ name }) => name)
        .some((name, i, arr) => arr.indexOf(name) !== i)
    ) {
      return new Error(
        'Invalid prop, every name property in form fields MUST be unique'
      )
    }
  },
  SubmitComponent: T.func,
  onSubmit: T.func.isRequired,
  title: T.object,
  classes: T.object,
}

const styles = theme => ({ ...theme.form })

export default withStyles(styles, { withTheme: true })(Form)
