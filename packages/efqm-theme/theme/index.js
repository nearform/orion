const palette = require('./mui/palette')
const typography = require('./mui/typography')
const shadows = require('./mui/shadows')
const props = require('./mui/props')

const MuiButton = require('./mui/muiComponentsOverrides/mui-button')
const MuiListItemText = require('./mui/muiComponentsOverrides/mui-list-item-text')
const MuiOutlinedInput = require('./mui/muiComponentsOverrides/mui-outlined-input')
const MuiTypography = require('./mui/muiComponentsOverrides/mui-typography')
const MuiTableCell = require('./mui/muiComponentsOverrides/mui-table-cell')
const MuiInput = require('./mui/muiComponentsOverrides/mui-input')
const MuiInputBase = require('./mui/muiComponentsOverrides/mui-input-base')

const articleTypography = require('./custom/article-typography')
const articleStatusColor = require('./custom/article-status-color')
const articleStatusLabelColor = require('./custom/article-status-label-color')
const articleStatusIconColor = require('./custom/article-status-icon-color')
const articleRateIconColor = require('./custom/article-rate-icon-color')
const articleWidgetColor = require('./custom/article-widget-color')
const taxonomyColor = require('./custom/taxonomy-color')
const editorsPicks = require('./custom/editors-picks')
const iconLight = require('./custom/icon-light')
const profileSpacerBackground = require('./custom/profile-spacer-background')

exports.muiTheme = {
  overrides: {
    MuiButton,
    MuiInput,
    MuiInputBase,
    MuiListItemText,
    MuiOutlinedInput,
    MuiTypography,
    MuiTableCell,
  },
  props,
  typography,
  palette,
  shadows,
  iconLight,
  articleTypography,
  articleStatusColor,
  articleStatusLabelColor,
  articleStatusIconColor,
  articleWidgetColor,
  articleRateIconColor,
  profileSpacerBackground,
  taxonomyColor,
  editorsPicks,
}

exports.googleFonts = ['Lato:400,700,900']
