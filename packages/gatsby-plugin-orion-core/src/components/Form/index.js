import React, { useState } from 'react'
import T from 'prop-types'
import { Grid } from '@material-ui/core'

import { InputField, SubmitButton } from '../FormFields'

function Form({
  formFields = [],
  submitButtonText,
  Title,
  SubmitText,
  onSubmit,
}) {
  const hasError = formFields.filter(field => field.error).length

  const [paramValues, setParamValues] = useState(
    new Array(formFields.length).fill('')
  )

  const handleInput = i => e =>
    setParamValues([
      ...paramValues.slice(0, i),
      e.target.value,
      ...paramValues.slice(i + 1),
    ])

  const handleOnSubmit = () => {
    onSubmit(paramValues.map((value, i) => ({ ...formFields[i], value })))
  }

  return (
    <div>
      <div>
        <Grid container spacing={3} justify="center">
          <Grid item xs={12}>
            {Title}
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
            <Grid item>{SubmitText}</Grid>
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
  formFields: T.arrayOf(T.object),
  submitButtonText: T.string,
  onSubmit: T.func.isRequired,
  Title: T.object,
  SubmitText: T.object,
}

export default Form
