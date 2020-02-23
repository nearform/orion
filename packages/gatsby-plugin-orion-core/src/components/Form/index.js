import React, { useState } from 'react'
import T from 'prop-types'
import { Grid, TextField, Button } from '@material-ui/core'
import { Formik, Form, Field, ErrorMessage } from 'formik'

import { InputField, SubmitButton } from '../FormFields'

function MyForm({
  formFields = [],
  submitButtonText,
  title,
  SubmitText,
  onSubmit,
}) {
  const hasError = formFields.filter(field => field.error).length

  const [paramValues, setParamValues] = useState(
    new Array(formFields.length).fill('')
  )

  const values = formFields.reduce((a, field) => {
    a[field.name] = ''
    return a
  }, {})

  const handleInput = i => e =>
    setParamValues([
      ...paramValues.slice(0, i),
      e.target.value,
      ...paramValues.slice(i + 1),
    ])

  const handleOnSubmit = () =>
    onSubmit &&
    onSubmit(paramValues.map((value, i) => ({ ...formFields[i], value })))

  const submit = data => {
    console.log(data)
  }

  return (
    <Grid container spacing={2} justify="center">
      <Grid item xs={12}>
        {title}
      </Grid>
      <Grid item xs={12}>
        <Formik initialValues={values} onSubmit={submit}>
          {props => {
            const {
              values,
              errors,
              touched,
              handleChange,
              isValid,
              setFieldTouched,
              handleSubmit,
              validateField,
            } = props

            const change = name => e => {
              e.persist()
              console.log(values)
              handleChange(e)
              setFieldTouched(name, true, false)
            }

            return (
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2} justify="center">
                  {formFields.map(({ name, ...formField }) => (
                    <Grid key={name} item xs={formField.xs || 12}>
                      <Field
                        value={values[name]}
                        name={name}
                        validate={formField.validate}
                        onChange={change(name)}
                      >
                        {({ field }) => (
                          <TextField
                            fullWidth
                            id="email"
                            helperText={touched[name] ? errors[name] : ''}
                            error={touched[name] && Boolean(errors[name])}
                            label="Email"
                            {...field}
                          />
                        )}
                      </Field>
                    </Grid>
                  ))}
                  <button type="button" onClick={() => validateField('email')}>
                    Check Username
                  </button>

                  <Button
                    fullWidth
                    type="submit"
                    variant="raised"
                    color="primary"
                    disabled={!isValid}
                  >
                    Submit
                  </Button>
                </Grid>
              </form>
            )
          }}
        </Formik>
      </Grid>
    </Grid>
  )
  return (
    <div>
      <div>
        <Grid container spacing={3} justify="center">
          <Grid item xs={12}>
            {title}
          </Grid>
          {formFields.map((params, i) => (
            <Grid key={params.key} item xs={params.xs}>
              <InputField
                fullWidth
                name={params.key}
                type={params.type}
                required={params.required}
                options={params.options}
                helperText={params.helperText}
                error={params.error}
                value={paramValues[i]}
                onChange={handleInput(i)}
              >
                {params.label}
              </InputField>
            </Grid>
          ))}
          <Grid
            item
            container
            alignItems="baseline"
            xs={12}
            spacing={1}
            wrap="nowrap"
            justify="space-between"
          >
            <Grid item>{SubmitText}</Grid>{' '}
            {/*   change this to submit component that takes a onSubmit prop   */}
            <Grid item>
              <SubmitButton hasError={hasError} onClick={handleOnSubmit}>
                {submitButtonText}
              </SubmitButton>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

Form.propTypes = {
  formFields: T.arrayOf(T.object), // Make a validator that each name/key should be unique
  submitButtonText: T.string,
  onSubmit: T.func.isRequired,
  title: T.object,
  SubmitText: T.object,
}

export default MyForm
