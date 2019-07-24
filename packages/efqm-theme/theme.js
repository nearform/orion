const { fade } = require('@material-ui/core/styles/colorManipulator')

const fontFamily = (exports.fontFamily = 'Lato, sans-serif')

const efqmDigitalPalette = {
  // Names / keys are unofficial descriptions
  slateGrey: 'rgb(69, 75, 102)',
  navyBlue: 'rgb(73, 98, 173)',
  cyan: 'rgb(80, 184, 242)',
  aqua: 'rgb(121, 204, 198)',
  emeraldGreen: 'rgb(112, 214, 112)',
  pearGreen: 'rgb(155, 220, 106)',
  yellow: 'rgb(255, 204, 0)',

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
    color: efqmDigitalPalette.slateGrey,
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
    color: efqmDigitalPalette.lightGrey,
    margin: '16px 0 2px',
  },
  heading3: {
    fontFamily,
    fontSize: '18px',
    fontWeight: 700,
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    color: efqmDigitalPalette.lightGrey,
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
    color: efqmDigitalPalette.slateGrey,
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
    lineHeight: 1.31,
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
    color: efqmDigitalPalette.aqua,
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
      backgroundColor: efqmDigitalPalette.paleGrey,
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
      color: efqmDigitalPalette.slateGrey,
      '&:first-child': {
        marginTop: '2px',
      },
    },
  },
}

const articleStatusColor = {
  inProgress: fade(efqmDigitalPalette.cyan, 0.1),
  inReview: fade(efqmDigitalPalette.yellow, 0.2),
  published: efqmDigitalPalette.navyBlue,
  hidden: fade(efqmDigitalPalette.lightGrey, 0.07),
}

const articleStatusLabelColor = {
  inProgress: efqmDigitalPalette.slateGrey,
  inReview: efqmDigitalPalette.slateGrey,
  published: efqmDigitalPalette.white,
  hidden: efqmDigitalPalette.slateGrey,
}

const articleStatusIconColor = {
  inProgress: efqmDigitalPalette.cyan,
  inReview: efqmDigitalPalette.slateGrey,
  published: efqmDigitalPalette.white,
  hidden: efqmDigitalPalette.lightGrey,
}

const articleTableIconColor = efqmDigitalPalette.lightGrey

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
    color: efqmDigitalPalette.slateGrey,
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
    color: efqmDigitalPalette.slateGrey,
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
  // material ui requires  25 elevations
  ...new Array(24).fill(
    '0 0 5px 0 rgba(0, 0, 0, 0.1), 0 2px 10px 0 rgba(0, 0, 0, 0.1)'
  ),
]

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
    MuiInput: {
      root: {
        ...typography.body1,
        borderRadius: 3,
        backgroundColor: efqmDigitalPalette.paleGrey,
      },
      input: {
        padding: '7.5px 12px 8.5px',
      },
    },
    MuiOutlinedInput: {
      root: {
        ...typography.body1,
        borderRadius: 3,
        boxShadow: shadows[1],
        background: efqmDigitalPalette.white,
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
      main: efqmDigitalPalette.navyBlue,
      light: efqmDigitalPalette.cyan,
      dark: efqmDigitalPalette.slateGrey,
    },
    secondary: {
      main: efqmDigitalPalette.aqua,
      light: efqmDigitalPalette.pearGreen,
      dark: efqmDigitalPalette.emeraldGreen,
    },
    background: {
      default: efqmDigitalPalette.white,
      paper: efqmDigitalPalette.white,
      light: efqmDigitalPalette.paleGrey,
      dark: efqmDigitalPalette.midGrey,
    },
    contrastThreshold: 1.6,
  },
  shadows,
  articleTypography,
  articleStatusColor,
  articleStatusLabelColor,
  articleStatusIconColor,
  articleTableIconColor,
}

exports.googleFonts = ['Lato:400,700,900']
