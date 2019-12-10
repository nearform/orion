const overview = require('./key-information-details/overview.js')
const challengesAndStrategy = require('./key-information-details/challenges-and-strategy.js')
const operationsPartnersSuppliers = require('./key-information-details/operations-partners-suppliers.js')
const marketOfferingsAndCustomers = require('./key-information-details/market-offerings-and-customers.js')
const managementStructure = require('./key-information-details/management-structure.js')

module.exports = [
  {
    key: 'key-information-details',
    overview,
    'challenges-and-strategy': challengesAndStrategy,
    'operations-partners-suppliers': operationsPartnersSuppliers,
    'market-offerings-and-customers': marketOfferingsAndCustomers,
    'management-structure': managementStructure,
  },
  {
    /*
     * Assessments are scored by:
     * 1 - Dividing the individual assessment total points by the sum of weighting
     *     (Example: business_matrix has 300 points, criteria_weighting = 10, result = 30)
     * 2 - Applying this divided result as a 'total possible points' to each criteria, multiplied
     *     by it's weight (In Business Matrix, this is 30, 30, 30, 60, 30, 60, 60)
     * 3 - If subcriteria exist, each subcriteria is given an equal number of points based on its
     *     parent criteria (Relevant only with Business Matrix Advanced)
     * 4 - Scoring is done with sliders that grant percentage-based (0-100) results. The avg percentage,
     *     potentially capped by a governing slider, is applied to the scored part's available points
     *     (30 * 67% = 20)
     * 5 - Point scores are displayed on the Feedback Report by part, criteria, pillar, and total
     */
    key: 'scoring',
    criteria_weighting: [1, 1, 1, 2, 1, 2, 2],
    questionnaire: 100,
    business_matrix: 300,
    business_matrix_advanced: 1000,
  },
]
