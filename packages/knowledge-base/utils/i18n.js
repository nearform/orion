import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  de: {
    translation: {
      'Your assessments': 'Ihre Einschätzungen',
    },
  },
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
  })

  return i18n
}
