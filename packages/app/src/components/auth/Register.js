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
import SectionTitle from '../SectionTitle'

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
        <Grid container direction="column" spacing={3}>
          <Grid item xs={9}>
            <SectionTitle gutterBottom barColor={theme.palette.secondary.main}>
              Create a new account
            </SectionTitle>
          </Grid>
          {signUpFields.map(({ label, key, required, type, options = [] }) => (
            <Grid key={key} item>
              <Typography variant="h4" gutterBottom>
                {label}
                {required && ' *'}
              </Typography>
              {type === 'select' ? (
                <CustomSelect
                  required={required}
                  name={key}
                  options={options}
                  onChange={handleInput}
                  fullWidth
                />
              ) : (
                <TextField
                  name={key}
                  type={type}
                  required={required}
                  onChange={handleInput}
                  fullWidth
                />
              )}
            </Grid>
          ))}

          <Grid item container alignItems="baseline" spacing={1} wrap="nowrap">
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
}

export default withStyles(styles, { withTheme: true })(Register)
