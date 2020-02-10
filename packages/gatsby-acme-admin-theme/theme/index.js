const palette = require('./mui/palette')

const MuiListItem = require('./mui/muiComponentsOverrides/mui-list-item')
const MuiListItemText = require('./mui/muiComponentsOverrides/mui-list-item-text')
const MuiIcon = require('./mui/muiComponentsOverrides/mui-icon')
const MuiDrawer = require('./mui/muiComponentsOverrides/mui-drawer')

exports.muiTheme = {
  overrides: {
    MuiListItem,
    MuiListItemText,
    MuiIcon,
    MuiDrawer,
  },
  palette,
}

exports.googleFonts = ['Titillium Web:400,700,900']
