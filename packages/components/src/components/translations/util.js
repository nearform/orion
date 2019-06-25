import * as theme from '../../../theme.es'
const DEFAULT_NAMESPACE = 'translation'

export default function addTranslations(
  translationsKey,
  i18next,
  themeOverride
) {
  const themeKey = themeOverride || theme[translationsKey]
  if (!themeKey) return

  themeKey.forEach(resource => {
    if (resource.translations) {
      for (const [lang, translations] of Object.entries(
        resource.translations
      )) {
        i18next.addResourceBundle(
          lang,
          DEFAULT_NAMESPACE,
          Object.entries(translations).reduce(
            (acc, [key, value]) => ({
              ...acc,
              [resource[key]]: value,
            }),
            {}
          )
        )
      }
    }

    Object.values(resource)
      .filter(resourcePropValue => Array.isArray(resourcePropValue))
      .forEach(resourcePropValue =>
        addTranslations('', i18next, resourcePropValue)
      )
  })
}
