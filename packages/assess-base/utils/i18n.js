import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import espanol from './translations/es_ES.json'
import deutsch from './translations/de_DE.json'

const resources = {
  de: deutsch,
  es: espanol,
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
