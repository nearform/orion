const overview = require('./key-information-details/overview.js')
const challengesAndStrategy = require('./key-information-details/challenges-and-strategy.js')
const operationsPartnersSuppliers = require('./key-information-details/operations-partners-suppliers.js')
const marketOfferingsAndCustomers = require('./key-information-details/market-offerings-and-customers.js')
const managementStructure = require('./key-information-details/management-structure.js')

module.exports = [
  require('./business-matrix.json'),
  require('./business-matrix-advanced.json'),
  require('./questionnaire.json'),
  {
    key: 'key-information-details',
    overview,
    'challenges-and-strategy': challengesAndStrategy,
    'operations-partners-suppliers': operationsPartnersSuppliers,
    'market-offerings-and-customers': marketOfferingsAndCustomers,
    'management-structure': managementStructure,
  },
]
