import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import espanol from 'efqm-theme/assessments/es/es_AB.json'
import deutsch from 'efqm-theme/assessments/de/de_AB.json'
import english from 'efqm-theme/assessments/en/en_AB.json'

const resources = {
  de: deutsch,
  es: espanol,
  en: english,
}

export async function init() {
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
