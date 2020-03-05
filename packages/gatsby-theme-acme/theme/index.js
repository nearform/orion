const MuiListItemText = require('./mui/muiComponentsOverrides/mui-list-item-text')
const MuiIcon = require('./mui/muiComponentsOverrides/mui-icon')
const MuiDrawer = require('./mui/muiComponentsOverrides/mui-drawer')
const MuiPaper = require('./mui/muiComponentsOverrides/mui-paper')
const MuiButton = require('./mui/muiComponentsOverrides/mui-button')
const MuiInput = require('./mui/muiComponentsOverrides/mui-input')
const MuiGrid = require('./mui/muiComponentsOverrides/mui-grid')

// Section below are theme key word specific overrides https://material-ui.com/customization/default-theme/
const palette = require('./mui/palette')
const typography = require('./mui/typography')

// Custom class related themes
const appBar = require('./custom/app-bar')
const articleContent = require('./custom/article-content')
const articleMetadata = require('./custom/article-metadata')
const footer = require('./custom/footer')
const horizontalMenu = require('./custom/horizontal-menu')
const layout = require('./custom/layout')
const searchInput = require('./custom/search-input')
const secondaryAppBar = require('./custom/secondary-app-bar')
const form = require('./custom/form')
const articleStatusChip = require('./custom/article-status-chip')

exports.muiTheme = {
  overrides: {
    MuiListItemText,
    MuiIcon,
    MuiDrawer,
    MuiPaper,
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
  appBar,
  articleStatusChip,
  horizontalMenu,
}

exports.googleFonts = ['Titillium Web:400,700,900']
