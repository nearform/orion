import React, { useState } from 'react'
import T from 'prop-types'
import {
  Typography,
  withStyles,
  Grid,
  Button,
  TextField,
  Select,
  MenuItem,
} from '@material-ui/core'

import { SectionTitle } from 'components'

function CustomSelect({ options = [], onChange, value = '', ...props }) {
  const [selectValue, setValue] = useState(value)
  const handleChange = evt => {
    setValue(evt.target.value)
    if (onChange) {
      onChange(evt)
    }
  }
  return (
    <Select {...props} onChange={handleChange} value={selectValue}>
      {options.map(opt => (
        <MenuItem key={opt} value={opt}>
          {opt.charAt(0).toUpperCase() + opt.slice(1)}
        </MenuItem>
      ))}
    </Select>
  )
}

function Register({
  theme,
  classes,
  signUp,
  goToSignIn,
  handleInput,
  signUpFields,
}) {
  return (
    <div className={classes.root}>
      <div>
        <Grid container spacing={3} xs={5} className={classes.form}>
          <Grid item xs={8}>
            <SectionTitle gutterBottom barColor={theme.palette.secondary.main}>
              Create a new account
            </SectionTitle>
          </Grid>
          {signUpFields.map(params => {
            return (
              <Grid key={params.key} item xs={params.xs}>
                <Typography variant="h4" gutterBottom>
                  {params.label}
                  {params.required && ' *'}
                </Typography>
                {params.type === 'select' ? (
                  <CustomSelect
                    required={params.required}
                    name={params.key}
                    options={params.options}
                    onChange={handleInput}
                    fullWidth
                  />
                ) : (
                  <TextField
                    name={params.key}
                    type={params.type}
                    required={params.required}
                    onChange={handleInput}
                    fullWidth
                  />
                )}
              </Grid>
            )
          })}
          <Grid
            item
            container
            alignItems="baseline"
            xs={9}
            spacing={1}
            wrap="nowrap"
          >
            <Grid item>
              <Typography variant="h4" color="textSecondary" noWrap>
                Have an account?
              </Typography>
            </Grid>
            <Grid item>
              <Button color="secondary" onClick={goToSignIn} size="small">
                Sign In
              </Button>
            </Grid>
            <Grid item xs={2}>
              &nbsp;
            </Grid>
            <Grid item>
              <Button
                name="submit"
                color="secondary"
                variant="contained"
                fullWidth
                onClick={signUp}
              >
                Create Account
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

Register.propTypes = {
  theme: T.object.isRequired,
  classes: T.object.isRequired,
  signUp: T.func.isRequired,
  goToSignIn: T.func.isRequired,
  handleInput: T.func.isRequired,
  signUpFields: T.array.isRequired,
}

const styles = {
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  form: {
    margin: 'auto',
    maxWidth: 510,
  },
}

export default withStyles(styles, { withTheme: true })(Register)
