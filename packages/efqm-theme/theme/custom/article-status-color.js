const { colorDefinitions } = require('../variables')
const { fade } = require('@material-ui/core/styles/colorManipulator')

module.exports = {
  inProgress: fade(colorDefinitions.cyan, 0.1),
  inReview: fade(colorDefinitions.yellow, 0.2),
  published: colorDefinitions.navyBlue,
  hidden: fade(colorDefinitions.lightGrey, 0.07),
}
