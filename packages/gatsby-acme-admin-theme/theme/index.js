const palette = require('./mui/palette')
const typography = require('./mui/typography')

const MuiListItemText = require('./mui/muiComponentsOverrides/mui-list-item-text')
const MuiIcon = require('./mui/muiComponentsOverrides/mui-icon')
const MuiDrawer = require('./mui/muiComponentsOverrides/mui-drawer')

exports.muiTheme = {
  overrides: {
    MuiListItemText,
    MuiIcon,
    MuiDrawer,
  },
  palette,
  typography,
}

exports.googleFonts = ['Titillium Web:400,700,900']
