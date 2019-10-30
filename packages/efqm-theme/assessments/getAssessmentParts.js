const assessmentKeys = {
  questionnaire: 'questionnaire.json',
  'efqm-2020': 'business-matrix.json',
  'efqm-2020-advanced': 'business-matrix-advanced.json',
}

const keyInfo = {
  'challenges-and-strategy': 'challenges-and-strategy.js',
  'management-structure': 'management-structure.js',
  'market-offerings-and-customers': 'market-offerings-and-customers.js',
  'operations-partners-suppliers': 'operations-partners-suppliers.js',
  overview: 'overview.js',
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
  l = 'en',
  pillar = null,
  criterion = null,
  part = null
) => {
  if (!assessmentKeys.hasOwnProperty(key)) {
    return {}
  }
  const assessment = require(`./${l}/${assessmentKeys[key]}`)
  if (pillar) {
    for (let p of assessment.pillars) {
      if (p.key === pillar.key) {
        pillar = p
        break
      }
    }
    if (criterion) {
      for (let c of pillar.criteria) {
        if (c.key === criterion.key) {
          criterion = c
          break
        }
      }
      if (part) {
        for (let pt of criterion.parts) {
          if (pt.tables[0]['key'] === part.tables[0]['key']) {
            part = pt
            break
          }
        }
      }
    }
  }

  return { assessment, pillar, criterion, part }
}

/*
 * Replace static pre-built pageContext key-information data with translated file of key-information data
 *
 * @param {string} key The string identifier of the key-information part
 * @param {string} l The string identifier of the language (2 character lower-case ISO code)
 *
 * @return {object} The markdown text of the desired language
 */
const getKeyInfo = (key, l = 'en') => {
  if (!keyInfo.hasOwnProperty(key)) {
    return {}
  }
  return require(`./${l}/key-information-details/${keyInfo[key]}`)
}

const getAssessmentTypes = l => {
  const types = []
  for (let ak in assessmentKeys) {
    let type = require(`./${l}/${assessmentKeys[ak]}`)
    types.push({
      key: type.key,
      logoAsset: type.logoAsset,
      name: type.name,
      tableName: type.tableName,
      orderIndex: type.orderIndex,
      shortDescription: type.shortDescription,
      startPhrase: type.startPhrase,
    })
  }

  return types
}

export { getAssessmentParts, getKeyInfo, getAssessmentTypes }
