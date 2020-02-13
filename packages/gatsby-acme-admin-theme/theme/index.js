const MuiListItemText = require('./mui/muiComponentsOverrides/mui-list-item-text')
const MuiIcon = require('./mui/muiComponentsOverrides/mui-icon')
const MuiDrawer = require('./mui/muiComponentsOverrides/mui-drawer')
const MuiPaper = require('./mui/muiComponentsOverrides/mui-paper')
const MuiAppBar = require('./mui/muiComponentsOverrides/mui-app-bar')
const MuiMenu = require('./mui/muiComponentsOverrides/mui-menu')

// Section below are theme key word specific overrides https://material-ui.com/customization/default-theme/
const palette = require('./mui/palette')
const typography = require('./mui/typography')

// Custom class related themes
const footer = require('./custom/footer')

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
  footer: { footer },
}

exports.googleFonts = ['Titillium Web:400,700,900']
