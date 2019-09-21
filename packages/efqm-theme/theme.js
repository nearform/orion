const { fade } = require('@material-ui/core/styles/colorManipulator')

const fontFamily = (exports.fontFamily = 'Lato, sans-serif')

const colorDefinitions = {
  // Names / keys are unofficial descriptions
  slateGrey: 'rgb(69, 75, 102)',
  navyBlue: 'rgb(73, 98, 173)',
  cyan: 'rgb(80, 184, 242)',
  aqua: 'rgb(121, 204, 198)',
  emeraldGreen: 'rgb(112, 214, 112)',
  pearGreen: 'rgb(155, 220, 106)',
  yellow: 'rgb(255, 204, 0)',
  purple: 'rgb(97, 89, 128)',
  orange: 'rgb(250,119,94)',

  // Shades used in designs not included in EFQM docs
  paleGrey: 'rgb(244, 246, 248)',
  lightGrey: 'rgb(156,175,195)',
  midGrey: 'rgb(152, 175, 198)',
  white: 'rgb(255, 255, 255)',
  black: 'rgb(0, 0, 0)',
}

const articleTypography = {
  heading1: {
    fontFamily,
    fontSize: '32px',
    fontWeight: 700,
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: '-0.23px',
    color: colorDefinitions.slateGrey,
    margin: '18px 0 2px',
    '& + h3': {
      marginTop: '3px',
    },
  },
  heading2: {
    fontFamily,
    fontSize: '24px',
    fontWeight: 700,
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: '-0.17px',
    color: colorDefinitions.lightGrey,
    margin: '6px 0 2px',
  },
  heading3: {
    fontFamily,
    fontSize: '18px',
    fontWeight: 700,
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    color: colorDefinitions.lightGrey,
    margin: '14px 0 2px',
  },
  heading4: {
    fontFamily,
    fontSize: '16px',
    fontWeight: 700,
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    color: colorDefinitions.slateGrey,
    margin: '12px 0 2px',
  },
  firstParagraph: {
    fontSize: '18px',
    lineHeight: 1.33,
    letterSpacing: '-0.19px',
    margin: '14px 0 2px',
  },
  paragraph: {
    fontFamily,
    fontSize: '16px',
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 1.5,
    letterSpacing: 'normal',
    color: 'rgb(46,46,46)',
    margin: '12px 0 2px',
  },
  bold: {
    fontWeight: 700,
  },
  italic: {
    fontStyle: 'italic',
  },
  link: {
    color: colorDefinitions.aqua,
    paddingBottom: '2px',
    borderBottom: '2px solid',
    '&:hover': {
      borderBottom: 'none',
      textDecoration: 'none',
    },
  },
  bulletedList: {
    margin: '36px 0 2px',
    paddingLeft: '36px',
    listStyle: 'none',
  },
  bulletedListItem: {
    fontFamily,
    fontSize: '16px',
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 1.31,
    letterSpacing: 'normal',
    color: 'rgb(46,46,46)',
    margin: '6px 0 2px',
    position: 'relative',
    '&::before': {
      content: '"."',
      backgroundColor: 'rgb(216,216,216, .5)',
      color: 'transparent',
      display: 'block',
      width: '8px',
      height: '8px',
      borderRadius: '4px',
      position: 'absolute',
      right: 'calc(100% + 19px)',
      top: '6px',
    },
  },
  numberedList: {
    fontFamily,
    margin: '36px 0 2px',
    paddingLeft: '36px',
    listStyle: 'none',
    counterReset: 'li',
  },
  numberedListItem: {
    fontFamily,
    fontSize: '16px',
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 1.31,
    letterSpacing: 'normal',
    color: 'rgb(46,46,46)',
    margin: '6px 0 2px',
    position: 'relative',
    counterIncrement: 'li',
    '&::before': {
      content: 'counter(li)"."',
      textAlign: 'right',
      display: 'block',
      position: 'absolute',
      right: 'calc(100% + 19px)',
      top: '0',
    },
  },
  blockquote: {
    border: 0,
    padding: '3px 0 3px 26px',
    margin: '28px 0 2px',
    position: 'relative',
    '&::before': {
      borderRadius: '4px',
      backgroundColor: colorDefinitions.paleGrey,
      color: 'transparent',
      position: 'absolute',
      width: '8px',
      display: 'block',
      top: 0,
      left: 0,
      bottom: 0,
      content: '"."',
    },
    '& p': {
      fontSize: '18px',
      fontStyle: 'italic',
      lineHeight: 'normal',
      letterSpacing: '-0.19px',
      color: colorDefinitions.slateGrey,
      '&:first-child': {
        marginTop: '2px',
      },
    },
  },

  articleEditButton: {
    fontFamily,
    fontSize: 12,
    fontWeight: '900',
    lineHeight: 'normal',
    letterSpacing: 1.8,
    backgroundColor: colorDefinitions.paleGrey,
    color: colorDefinitions.lightGrey,
    boxShadow: 'none',
  },

  input: {
    backgroundColor: colorDefinitions.paleGrey,
    color: colorDefinitions.lightGrey,
  },
}

const articleStatusColor = {
  inProgress: fade(colorDefinitions.cyan, 0.1),
  inReview: fade(colorDefinitions.yellow, 0.2),
  published: colorDefinitions.navyBlue,
  hidden: fade(colorDefinitions.lightGrey, 0.07),
}

const articleStatusLabelColor = {
  inProgress: colorDefinitions.slateGrey,
  inReview: colorDefinitions.slateGrey,
  published: colorDefinitions.white,
  hidden: colorDefinitions.slateGrey,
}

const articleStatusIconColor = {
  inProgress: colorDefinitions.cyan,
  inReview: colorDefinitions.slateGrey,
  published: colorDefinitions.white,
  hidden: colorDefinitions.lightGrey,
}

const articleRateIconColor = {
  empty: colorDefinitions.lightGrey,
  filled: colorDefinitions.yellow,
}

const iconLight = {
  color: colorDefinitions.lightGrey,
}
const articleWidgetColor = colorDefinitions.purple
const profileSpacerBackground = colorDefinitions.purple

const taxonomyColor = {
  C1: colorDefinitions.orange,
  C2: colorDefinitions.navyBlue,
  C3: colorDefinitions.cyan,
  C4: colorDefinitions.emeraldGreen,
}

const editorsPicks = {
  title: {
    textAlign: 'left',
    fontFamily,
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: '-0.1px',
    color: colorDefinitions.slateGrey,
  },
  date: {
    fontFamily,
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: '1.23px',
    color: colorDefinitions.purple,
    textTransform: 'uppercase',
  },
  author: {
    fontFamily,
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: '1.23px',
    color: colorDefinitions.lightGrey,
    textTransform: 'uppercase',
  },
  caption: {
    fontFamily,
    fontSize: 12,
    fontWeight: 900,
    letterSpacing: '2.45px',
    color: colorDefinitions.white,
    textTransform: 'uppercase',
  },
}

const typography = {
  h1: {
    fontFamily,
    fontWeight: '900',
    fontSize: 28,
    letterSpacing: 0.5,
  },
  h2: {
    fontFamily,
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 'normal',
    letterSpacing: -0.1,
  },
  h3: {
    fontFamily,
    fontWeight: '900',
    fontSize: 12,
    letterSpacing: 1.8,
    textTransform: 'uppercase',
  },
  h4: {
    fontFamily,
    fontWeight: 'bold',
    fontSize: 11,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  h5: {
    fontFamily,
    fontWeight: 'bold',
  },
  h6: {
    // Mainly used for bold numbers in tables and graphics
    fontFamily,
    fontSize: 20,
    fontWeight: '900',
    lineHeight: 1.4,
    letterSpacing: -0.2,
  },
  caption: {
    fontFamily,
    fontSize: 14,
    letterSpacing: 'normal',
    color: colorDefinitions.lightGrey,
  },
  body2: {
    fontFamily,
    fontSize: 14,
    letterSpacing: 'normal',
  },
  body1: {
    fontFamily,
    fontSize: 16,
    letterSpacing: 'normal',
  },
  tableHeader: {
    fontFamily,
    color: colorDefinitions.slateGrey,
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: '1.2px',
    lineHeight: '13px',
    textTransform: 'uppercase',
    textAlign: 'left',
    padding: '16px 14px 10px',
  },
  tableCell: {
    fontFamily,
    fontSize: 14,
    letterSpacing: 'normal',
    color: colorDefinitions.slateGrey,
    padding: '10px 14px',
  },
  placeholder: {
    fontFamily,
    fontSize: 14,
    lineHeight: 'normal',
    letterSpacing: -0.1,
  },
  button: {
    fontFamily,
    fontSize: 12,
    fontWeight: '900',
    lineHeight: 'normal',
    letterSpacing: 1.8,
  },
}

const shadows = [
  'none',
  '0 0 5px 0 rgba(0, 0, 0, 0.05), 0 2px 5px 0 rgba(0, 0, 0, 0.05)',
  // material ui requires  25 elevations
  ...new Array(23).fill(
    '0 0 5px 0 rgba(0, 0, 0, 0.1), 0 2px 10px 0 rgba(0, 0, 0, 0.1)'
  ),
]

const inputClasses = {
  root: {
    ...typography.body1,
    borderRadius: 3,
    backgroundColor: colorDefinitions.paleGrey,
  },
  input: {
    padding: '7.5px 12px 8.5px',
  },
}

exports.muiTheme = {
  overrides: {
    MuiButton: {
      root: {
        whiteSpace: 'nowrap',
        boxShadow: shadows[1],
        '&$outlined': {
          '&:disabled': {
            border: 'none',
            opacity: 0.7,
          },
        },
      },
      text: {
        boxShadow: 'none',
      },
      contained: {
        padding: '9px 24px 8px',
      },
      outlinedPrimary: {
        border: 'none',
        '&:hover': {
          border: 'none',
        },
      },
      outlinedSecondary: {
        background: colorDefinitions.white,
        border: 'none',
        '&:hover': {
          border: 'none',
        },
      },
      outlined: {
        padding: '8px 24px 7px',
      },
      sizeSmall: {
        fontSize: 11,
      },
    },
    MuiInput: inputClasses,
    MuiInputBase: inputClasses,
    MuiOutlinedInput: {
      root: {
        ...typography.body1,
        borderRadius: 3,
        boxShadow: shadows[1],
        background: colorDefinitions.white,
      },
      notchedOutline: {
        border: 'none',
      },
      input: {
        padding: '7.5px 12px 8.5px',
      },
    },
    MuiTypography: {
      gutterBottom: {
        marginBottom: '.75em',
      },
    },
    MuiTableCell: {
      head: {
        ...typography.tableHeader,
      },
      body: {
        ...typography.tableCell,
      },
    },
  },
  props: {
    MuiInput: {
      disableUnderline: true,
    },
    MuiPaper: {
      elevation: 1,
    },
  },
  typography: {
    fontFamily,
    fontWeight: 'normal',
    ...typography,
  },
  palette: {
    primary: {
      main: colorDefinitions.navyBlue,
      light: colorDefinitions.cyan,
      dark: colorDefinitions.slateGrey,
    },
    secondary: {
      main: colorDefinitions.aqua,
      light: colorDefinitions.pearGreen,
      dark: colorDefinitions.emeraldGreen,
    },
    tertiary: {
      main: colorDefinitions.lightGrey,
      light: colorDefinitions.paleGrey,
      dark: colorDefinitions.midGrey,
    },
    background: {
      default: colorDefinitions.white,
      paper: colorDefinitions.white,
      light: colorDefinitions.paleGrey,
      dark: colorDefinitions.midGrey,
    },
    contrastThreshold: 1.6,
  },
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
