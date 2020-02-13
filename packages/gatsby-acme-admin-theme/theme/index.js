const palette = require('./mui/palette')
const typography = require('./mui/typography')

const MuiListItemText = require('./mui/muiComponentsOverrides/mui-list-item-text')
const MuiIcon = require('./mui/muiComponentsOverrides/mui-icon')
const MuiDrawer = require('./mui/muiComponentsOverrides/mui-drawer')
const MuiPaper = require('./mui/muiComponentsOverrides/mui-paper')
const MuiAppBar = require('./mui/muiComponentsOverrides/mui-app-bar')
const MuiMenu = require('./mui/muiComponentsOverrides/mui-menu')

exports.muiTheme = {
  overrides: {
    MuiListItemText,
    MuiIcon,
    MuiDrawer,
    MuiPaper,
    MuiAppBar,
    MuiMenu,
  },
  palette,
  typography,
}

exports.googleFonts = ['Titillium Web:400,700,900']
