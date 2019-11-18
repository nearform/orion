import React from 'react'
import T from 'prop-types'
import { Select, MenuItem, withStyles } from '@material-ui/core'
import MoreVert from '@material-ui/icons/MoreVert'
import Twemoji from 'react-twemoji'
import { translations } from 'efqm-theme/config'

function getLanguageSwitcher(useTranslation) {
  // Must use app's import of useTranslation, can't import it here

  const LanguageSwitcher = ({ classes }) => {
    const { i18n } = useTranslation()

    const l = i18n.language || 'en'

    return (
      <>
        <Select
          className={classes.input}
          value={l}
          onChange={(_, item) => i18n.changeLanguage(item.props.value)}
          autoWidth={true}
          IconComponent={MoreVert}
          displayEmpty={true}
          renderValue={() => (
            <MenuItem className={classes.item} key={'val_' + l} value={l}>
              <Twemoji options={{ className: classes.icon }}>
                {translations[l].flag}
              </Twemoji>
              {l.toUpperCase()}
            </MenuItem>
          )}
        >
          {Object.values(translations).map(lang => (
            <MenuItem
              className={classes.item}
              key={'val_' + lang.abb}
              value={lang.abb}
            >
              <Twemoji options={{ className: classes.icon }}>
                {lang.flag}
              </Twemoji>
              {lang.name}
            </MenuItem>
          ))}
        </Select>
      </>
    )
  }

  LanguageSwitcher.propTypes = {
    classes: T.object.isRequired,
  }

  return withStyles(theme => ({
    input: {
      backgroundColor: theme.palette.background.paper,
      boxShadow:
        '0 0 5px 0 rgba(0, 0, 0, 0.1), 0 2px 10px 0 rgba(0, 0, 0, 0.1)',
      height: 32,
      borderRadius: '4px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      '& svg': {
        fill: theme.palette.secondary.main,
        padding: 0,
      },
      '& :focus': {
        backgroundColor: 'none',
      },
      '& *': {
        padding: '2px 16px 2px 4px',
      },
    },
    item: {
      color: theme.palette.primary.dark,
      fontSize: 12,
      minHeight: 0,
    },
    icon: {
      margin: '4px 4px 0 0',
      padding: 0,
      height: '18px',
    },
  }))(LanguageSwitcher)
}

export default getLanguageSwitcher
