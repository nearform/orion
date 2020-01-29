const palette = require('./mui/palette')
const typography = require('./mui/typography')
const shadows = require('./mui/shadows')
const props = require('./mui/props')

const MuiButton = require('./mui/muiComponentsOverrides/MuiButton')
const MuiListItemText = require('./mui/muiComponentsOverrides/MuiListItemText')
const MuiOutlinedInput = require('./mui/muiComponentsOverrides/MuiOutlinedInput')
const MuiTypography = require('./mui/muiComponentsOverrides/MuiTypography')
const MuiTableCell = require('./mui/muiComponentsOverrides/MuiTableCell')
const MuiInput = require('./mui/muiComponentsOverrides/MuiInput')
const MuiInputBase = require('./mui/muiComponentsOverrides/MuiInputBase')

const articleTypography = require('./custom/articleTypography')
const articleStatusColor = require('./custom/articleStatusColor')
const articleStatusLabelColor = require('./custom/articleStatusLabelColor')
const articleStatusIconColor = require('./custom/articleStatusIconColor')
const articleRateIconColor = require('./custom/articleRateIconColor')
const articleWidgetColor = require('./custom/articleWidgetColor')
const taxonomyColor = require('./custom/taxonomyColor')
const editorsPicks = require('./custom/editorsPicks')
const iconLight = require('./custom/iconLight')
const profileSpacerBackground = require('./custom/profileSpacerBackground')

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
