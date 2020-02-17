const MuiListItemText = require('./mui/muiComponentsOverrides/mui-list-item-text')
const MuiIcon = require('./mui/muiComponentsOverrides/mui-icon')
const MuiDrawer = require('./mui/muiComponentsOverrides/mui-drawer')
const MuiPaper = require('./mui/muiComponentsOverrides/mui-paper')
const MuiAppBar = require('./mui/muiComponentsOverrides/mui-app-bar')
const MuiMenu = require('./mui/muiComponentsOverrides/mui-menu')
const MuiButton = require('./mui/muiComponentsOverrides/mui-button')
const MuiInput = require('./mui/muiComponentsOverrides/mui-input')

// Section below are theme key word specific overrides https://material-ui.com/customization/default-theme/
const palette = require('./mui/palette')
const typography = require('./mui/typography')

// Custom class related themes
const footer = require('./custom/footer')
const searchInput = require('./custom/search-input')
const secondaryAppBar = require('./custom/secondary-app-bar')

exports.muiTheme = {
  overrides: {
    MuiListItemText,
    MuiIcon,
    MuiDrawer,
    MuiPaper,
    MuiAppBar,
    MuiMenu,
    MuiButton,
    MuiInput,
  },
  palette,
  typography,
  footer: { footer },
  searchInput,
  secondaryAppBar,
}

exports.googleFonts = ['Titillium Web:400,700,900']
