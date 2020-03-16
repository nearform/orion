import React from 'react'
import {
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  makeStyles,
} from '@material-ui/core'
import MoreVert from '@material-ui/icons/MoreVert'
import Twemoji from 'react-twemoji'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.common.white,
    boxShadow: theme.shadows[3],
    height: 32,
    borderRadius: 4,
    overflow: 'hidden',
    padding: 0,
  },
  input: {
    border: 0,
    padding: 0,
  },
  select: {
    padding: '0px !important',
  },
  icon: {
    '& > div > span': {
      display: 'flex',
      '& > img': {
        height: 24,
      },
    },
  },
  selected: {
    padding: theme.spacing(0, 4, 0, 1),
    '& $icon': {
      margin: theme.spacing(0, 1, 0, 0),
      minWidth: 'auto',
    },
    '& $text': {
      color: theme.palette.secondary.main,
      fontWeight: 'bold',
    },
  },
  text: {
    fontSize: 16,
  },
}))

function LanguageSelector() {
  const classes = useStyles()

  return (
    <Select
      autoWidth
      displayEmpty
      disableUnderline
      className={classes.input}
      classes={{ root: classes.root, select: classes.select }}
      value="en"
      IconComponent={MoreVert}
      MenuProps={{
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left',
        },
      }}
      renderValue={() => (
        <MenuItem value="en" className={classes.selected}>
          <ListItemIcon className={classes.icon}>
            <Twemoji>
              <span role="img" aria-label="En">
                🇬🇧
              </span>
            </Twemoji>
          </ListItemIcon>
          <ListItemText classes={{ primary: classes.text }}>En</ListItemText>
        </MenuItem>
      )}
    >
      <MenuItem value="en" className={classes.item}>
        <ListItemIcon className={classes.icon}>
          <Twemoji>
            <span role="img" aria-label="English">
              🇬🇧
            </span>
          </Twemoji>
        </ListItemIcon>
        <ListItemText classes={{ primary: classes.text }}>English</ListItemText>
      </MenuItem>
    </Select>
  )
}

export default LanguageSelector
