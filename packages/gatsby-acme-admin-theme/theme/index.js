const palette = require('./mui/palette')

const MuiListItem = require('./mui/muiComponentsOverrides/mui-list-item')
const MuiListItemText = require('./mui/muiComponentsOverrides/mui-list-item-text')
const MuiIcon = require('./mui/muiComponentsOverrides/mui-icon')

exports.muiTheme = {
  overrides: {
    MuiListItem,
    MuiListItemText,
    MuiIcon,
  },
  palette,
}

exports.googleFonts = ['Lato:400,700,900']
