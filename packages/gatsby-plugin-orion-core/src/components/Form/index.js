import React from 'react'
import T from 'prop-types'
import { Grid } from '@material-ui/core'

import { InputField, SubmitButton } from '../FormFields'

function Form({
  formFields = [],
  submitButtonText,
  Title,
  SubmitText,
  onSubmit,
  handleInput,
}) {
  const hasError = Boolean(formFields.filter(field => field.error))

  return (
    <div>
      <div>
        <Grid container spacing={3} justify="center">
          <Grid item xs={12}>
            {Title}
          </Grid>
          {formFields.map(params => (
            <Grid key={params.key} item xs={params.xs}>
              <InputField
                fullWidth
                name={params.key}
                type={params.type}
                required={params.required}
                options={params.options}
                helperText={params.helperText}
                error={params.error}
                onChange={handleInput}
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
            <Grid item>{SubmitText}</Grid>
            <Grid item>
              <SubmitButton hasError={hasError} onClick={onSubmit}>
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
  formFields: T.arrayOf(T.object),
  submitButtonText: T.string,
  onSubmit: T.func.isRequired,
  handleInput: T.func.isRequired,
  Title: T.object,
  SubmitText: T.object,
}

export default Form
