const keyInfo = {
  'challenges-and-strategy': 'challenges-and-strategy.js',
  'management-structure': 'management-structure.js',
  'market-offerings-and-customers': 'market-offerings-and-customers.js',
  'operations-partners-suppliers': 'operations-partners-suppliers.js',
  overview: 'overview.js',
}

// Each assessment type specifies a filename and a filter:
// - The filename is the name of the JSON file containing the assessment
//   configuration;
// - The filter is applied to the assessment configuration after it is
//   loaded to produce the required assessment type.
const assessmentTypes = {
  questionnaire: {
    filename: 'questionnaire.json',
    filter: assessment => assessment,
  },
  'efqm-2020': {
    filename: 'business-matrix.json',
    filter: (matrix, key) => {
      const result = deepClone(matrix)
      result.key = key
      result.matrixType = 'basic'
      result.orderIndex = 2
      result.logoAsset = 'assess-2-img'
      result.name = result.typeNames[key]
      // Select first subcriteria of each pillar.
      result.pillars.forEach(pillar => {
        pillar.criteria.forEach(criteria => {
          criteria.parts = criteria.parts.slice(0, 1)
        })
      })
      return result
    },
  },
  'efqm-2020-advanced': {
    filename: 'business-matrix.json',
    filter: (matrix, key) => {
      const result = deepClone(matrix)
      result.key = key
      result.matrixType = 'advanced'
      result.orderIndex = 3
      result.logoAsset = 'assess-3-img'
      result.name = result.typeNames[key]
      // Number subcriteria.
      result.pillars.forEach(pillar => {
        pillar.criteria.forEach((criteria, cidx) => {
          criteria.parts.forEach((part, pidx) => {
            const [table] = part.tables
            // Produce a name like "1.1: Xxxx"
            table.name = `${cidx + 1}.${pidx + 1}: ${table.name}`
          })
        })
      })
      return result
    },
  },
}

// Deep clone an object.
const deepClone = obj => JSON.parse(JSON.stringify(obj))

// Load an assessment type.
const loadAssessmentType = (lang, type) => {
  const assessmentType = assessmentTypes[type]
  if (!assessmentType) {
    return {}
  }
  const { filter, filename } = assessmentType
  // Note that the following is a dynamic require and relies on Webpack's context
  // functionality in order for it to work in a bundled environment (e.g. in the
  // browser). See https://github.com/webpack/docs/wiki/context for details. Note
  // also that all language-specific assessment data files are stored under a common
  // parent folder (/data) to avoid bundling resources which aren't dynamically loaded.
  return filter(require(`./data/${lang}/${filename}`), type)
}

/*
 * Replace static pre-built pageContext assessment template data with translated file of assessment template data
 *
 * @param {string} key The string identifier of the assessment-type
 * @param {string} l The string identifier of the language (2 character lower-case ISO code)
 * @param {object} pillar The pageContext pillar, if it exists
 * @param {object} criterion The pageContext criterion, if it exists
 * @param {object} part The pageContext criterion-part, if it exists
 *
 * @return {assessment, pillar, criterion, part} The assessment, and parts, retrieved for a given language
 */
const getAssessmentParts = (
  key,
  lang = 'en',
  pillar = null,
  criterion = null,
  part = null
) => {
  // Load and filter assessment data.
  const assessment = loadAssessmentType(lang, key)

  // Apply pillar/criterion/part filters.
  if (pillar) {
    pillar = assessment.pillars.find(p => p.key === pillar.key)
    if (pillar && criterion) {
      criterion = pillar.criteria.find(c => c.key === criterion.key)
      if (part && criterion) {
        const { key } = part.tables[0]
        part = criterion.parts.find(p => p.tables[0].key === key)
      }
    }
  }

  return { assessment, pillar, criterion, part }
}

/*
 * Replace static pre-built pageContext key-information data with translated file of key-information data
 *
 * @param {string} key The string identifier of the key-information part
 * @param {string} lang The string identifier of the language (2 character lower-case ISO code)
 *
 * @return {object} The markdown text of the desired language
 */
const getKeyInfo = (key, lang = 'en') => {
  if (!keyInfo.hasOwnProperty(key)) {
    return {}
  }
  // See note above on dynamic requires.
  return require(`./data/${lang}/key-information-details/${keyInfo[key]}`)
}

/**
 * Return localized assessment type configurations.
 *
 * @param {string} lang The string identifier of the language (2 character lower-case ISO code)
 *
 * @return {array} Array of objects representing each available assessment type
 */
const getAssessmentTypes = (lang = 'en') => {
  const result = []
  for (const type in assessmentTypes) {
    result.push(loadAssessmentType(lang, type))
  }
  return result
}

/**
 * Return localized names for the different assessment types.
 *
 * @param {string} lang The string identifier of the language (2 character lower-case ISO code)
 *
 * @return {object} A map of assessment type keys to localized assessment names.
 */
const getAssessmentTypeNames = (lang = 'en') => {
  const result = {}
  for (const type in assessmentTypes) {
    const assessment = loadAssessmentType(lang, type)
    result[type] = assessment.name
  }
  return result
}

module.exports = {
  getAssessmentParts,
  getKeyInfo,
  getAssessmentTypes,
  getAssessmentTypeNames,
}
