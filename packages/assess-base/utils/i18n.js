import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { translations } from 'efqm-theme/config'

const getResources = () => {
  const translationOptions = Object.keys(translations)
  const resources = {}
  translationOptions.map(abb => {
    resources[
      abb
    ] = require(`efqm-theme/assessments/data/${abb}/${abb}_AB.json`)
  })
  return resources
}

export async function init() {
  const resources = getResources()
  await i18n.use(initReactI18next).init({
    resources,
    lng: 'en',
    keySeparator: false,
    nsSeparator: false,
    interpolation: {
      escapeValue: false,
    },
    returnEmptyString: false,
  })

  return i18n
}
