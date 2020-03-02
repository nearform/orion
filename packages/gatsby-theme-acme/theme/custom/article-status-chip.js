const { colorDefinitions } = require('../variables')
const { fade } = require('@material-ui/core/styles/colorManipulator')

module.exports = {
  inProgress: {
    labelColor: colorDefinitions.slateGrey,
    chipColor: fade(colorDefinitions.cyan, 0.1),
    iconColor: colorDefinitions.cyan,
  },
  inReview: {
    labelColor: colorDefinitions.slateGrey,
    chipColor: fade(colorDefinitions.yellow, 0.2),
    iconColor: colorDefinitions.slateGrey,
  },
  published: {
    labelColor: colorDefinitions.white,
    chipColor: colorDefinitions.navyBlue,
    iconColor: colorDefinitions.white,
  },
  hidden: {
    labelColor: colorDefinitions.slateGrey,
    chipColor: fade(colorDefinitions.lightGrey, 0.07),
    iconColor: colorDefinitions.lightGrey,
  },
}
