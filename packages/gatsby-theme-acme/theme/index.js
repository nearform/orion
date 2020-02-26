const MuiListItemText = require('./mui/muiComponentsOverrides/mui-list-item-text')
const MuiIcon = require('./mui/muiComponentsOverrides/mui-icon')
const MuiDrawer = require('./mui/muiComponentsOverrides/mui-drawer')
const MuiPaper = require('./mui/muiComponentsOverrides/mui-paper')
const MuiAppBar = require('./mui/muiComponentsOverrides/mui-app-bar')
const MuiPopover = require('./mui/muiComponentsOverrides/mui-popover')
const MuiButton = require('./mui/muiComponentsOverrides/mui-button')
const MuiInput = require('./mui/muiComponentsOverrides/mui-input')
const MuiGrid = require('./mui/muiComponentsOverrides/mui-grid')

// Section below are theme key word specific overrides https://material-ui.com/customization/default-theme/
const palette = require('./mui/palette')
const typography = require('./mui/typography')

// Custom class related themes
const articleContent = require('./custom/article-content')
const articleMetadata = require('./custom/article-metadata')
const footer = require('./custom/footer')
const layout = require('./custom/layout')
const searchInput = require('./custom/search-input')
const secondaryAppBar = require('./custom/secondary-app-bar')
const form = require('./custom/form')

exports.muiTheme = {
  overrides: {
    MuiListItemText,
    MuiIcon,
    MuiDrawer,
    MuiPaper,
    MuiAppBar,
    MuiPopover,
    MuiButton,
    MuiInput,
    MuiGrid,
  },
  palette,
  typography,
  articleContent,
  articleMetadata,
  footer: { footer },
  layout,
  searchInput,
  secondaryAppBar,
  form,
}

exports.googleFonts = ['Titillium Web:400,700,900']
