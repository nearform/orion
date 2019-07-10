import React from 'react'
import T from 'prop-types'
import { withStyles } from '@material-ui/core'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'

const styles = () => ({
  root: {
    alignSelf: 'center',
  },
})

function getLanguageSwitcher(useTranslation) {
  // Must use app's import of useTranslation, can't import it here

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
  LanguageSwitcher.propTypes = {
    classes: T.object.isRequired,
  }

  return withStyles(styles)(LanguageSwitcher)
}

export default getLanguageSwitcher
