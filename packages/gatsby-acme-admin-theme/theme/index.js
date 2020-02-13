const palette = require('./mui/palette')
const typography = require('./mui/typography')

const MuiListItemText = require('./mui/muiComponentsOverrides/mui-list-item-text')
const MuiIcon = require('./mui/muiComponentsOverrides/mui-icon')
const MuiDrawer = require('./mui/muiComponentsOverrides/mui-drawer')
const MuiPaper = require('./mui/muiComponentsOverrides/mui-paper')

// Custom class related themes
const searchInput = require('./custom/search-input')
const secondaryAppBar = require('./custom/secondary-app-bar')

exports.muiTheme = {
  overrides: {
    MuiListItemText,
    MuiIcon,
    MuiDrawer,
    MuiPaper,
  },
  palette,
  typography,
  searchInput,
  secondaryAppBar,
}

exports.googleFonts = ['Titillium Web:400,700,900']
