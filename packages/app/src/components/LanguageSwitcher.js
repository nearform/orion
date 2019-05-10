import React from 'react'
import { useTranslation } from 'react-i18next'
import { withStyles } from '@material-ui/core'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'

function LanguageSwitcher({ classes }) {
  const { i18n } = useTranslation()

  return (
    <ToggleButtonGroup
      value={i18n.language}
      exclusive
      onChange={(_, language) => i18n.changeLanguage(language)}
      className={classes.root}
    >
      <ToggleButton value="en">EN</ToggleButton>
      <ToggleButton value="de">DE</ToggleButton>
    </ToggleButtonGroup>
  )
}

const styles = () => ({
  root: {
    alignSelf: 'center',
  },
})

export default withStyles(styles)(LanguageSwitcher)
