import React, { useState } from 'react'
import {
  Typography,
  withStyles,
  Grid,
  Button,
  TextField,
  Select,
  MenuItem,
} from '@material-ui/core'

function CustomSelect({ options, onChange, value = '', ...props }) {
  const [selectValue, setValue] = useState(value)
  const handleChange = evt => {
    setValue(evt.target.value)
    if (onChange) {
      onChange(evt)
    }
  }
  return (
    <Select {...props} onChange={handleChange} value={selectValue}>
      {(options || []).map(opt => (
        <MenuItem key={opt} value={opt}>
          {opt.charAt(0).toUpperCase() + opt.slice(1)}
        </MenuItem>
      ))}
    </Select>
  )
}

import SectionTitle from '../components/SectionTitle'
function Register({
  theme,
  classes,
  signUp,
  goToSignIn,
  handleInput,
  signUpFields,
  inputValues,
}) {
  return (
    <div className={classes.root}>
      <div>
        <Grid container direction="column" spacing={theme.spacing.unit * 3}>
          <Grid item xs={9}>
            <SectionTitle gutterBottom barColor={theme.palette.secondary.main}>
              Create a new account
            </SectionTitle>
          </Grid>
          {signUpFields.map(({ label, key, required, type, ...other }) => (
            <Grid key={key} item>
              <Typography variant="h4" gutterBottom>
                {label}
                {required ? ' *' : ''}
              </Typography>
              {type === 'select' ? (
                <CustomSelect
                  required
                  name={key}
                  options={other.options}
                  onChange={handleInput}
                  fullWidth
                />
              ) : (
                <TextField
                  name={key}
                  type={type}
                  onChange={handleInput}
                  fullWidth
                />
              )}
            </Grid>
          ))}

          <Grid
            item
            container
            alignItems="baseline"
            spacing={theme.spacing.unit}
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

const styles = {
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
}

export default withStyles(styles, { withTheme: true })(Register)
