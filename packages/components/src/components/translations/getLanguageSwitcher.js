import React from 'react'
import T from 'prop-types'
import classnames from 'classnames'
import { Select, MenuItem, withStyles } from '@material-ui/core'
import MoreVert from '@material-ui/icons/MoreVert'
import Twemoji from 'react-twemoji'

const languageOptions = {
  en: {
    abb: 'en',
    name: 'English',
    flag: 'em-gb',
  },
  de: {
    abb: 'de',
    name: 'Deutsch',
    flag: 'em-de',
  },
  es: {
    abb: 'es',
    name: 'Español',
    flag: 'em-es',
  },
}

function getLanguageSwitcher(useTranslation) {
  // Must use app's import of useTranslation, can't import it here
  // Flag icons are twitter-style emojis from github source here: https://afeld.github.io/emoji-css/

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
              <Twemoji options={{ className: classes.icon }}>\u1f1e9</Twemoji>
              {l.toUpperCase()}
            </MenuItem>
          )}
        >
          {Object.values(languageOptions).map(lang => (
            <MenuItem
              className={classes.item}
              key={'val_' + lang.abb}
              value={lang.abb}
            >
              <i className={classnames(classes.icon, 'em', lang.flag)}></i>
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
      marginRight: theme.spacing(1),
    },
  }))(LanguageSwitcher)
}

export default getLanguageSwitcher
