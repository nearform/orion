module.exports = {
  assetsPath: 'assets',
  assessmentsPath: 'assessments',
  knowledgeTypesPath: 'knowledgeTypes',
  heroImageNameAB: 'bannerHeroAB',
  heroImageNameKB: 'bannerHeroKB',
  modelImageAB: 'modelImageAB',
  translations: {
    en: {
      abb: 'en',
      name: 'English',
      flag: '🇬🇧',
    },
    de: {
      abb: 'de',
      name: 'Deutsch',
      flag: '🇩🇪',
    },
    es: {
      abb: 'es',
      name: 'Español',
      flag: '🇪🇸',
    },
  },
  scoring: {
    /*
     * Assessments are scored by:
     * 1 - Applying an assessment's point value as a 'total possible points' to each criteria, multiplied
     *     by it's weight (In Business Matrix, this is 30, 30, 30, 60, 30, 60, 60)
     * 2 - If subcriteria exist, each subcriteria is given an equal number of points based on its
     *     parent criteria (Relevant only with Business Matrix Advanced)
     * 3 - Scoring is done with sliders that grant percentage-based (0-100) results. The avg percentage,
     *     potentially capped by a governing slider, is applied to the scored part's available points
     *     (30 * 67% = 20)
     * 4 - Point scores are displayed on the Feedback Report by part, criteria, pillar, and total
     */
    criteriaWeighting: {
      'purpose-strategy': 1,
      'leadership-culture': 1,
      'engaging-stakeholders': 1,
      'creating-value': 2,
      'driving-performance': 1,
      'stakeholder-perceptions': 2,
      'strategic-performance': 2,
    },
    questionnaire: 10,
    'efqm-2020': 30,
    'efqm-2020-advanced': 100,
  },
}
