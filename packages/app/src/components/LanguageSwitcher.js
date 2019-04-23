import React from 'react'
import { useTranslation } from 'react-i18next'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()

  return (
    <ToggleButtonGroup
      value={i18n.language}
      exclusive
      onChange={(_, language) => i18n.changeLanguage(language)}
    >
      <ToggleButton value="en">EN</ToggleButton>
      <ToggleButton value="de">DE</ToggleButton>
    </ToggleButtonGroup>
  )
}
