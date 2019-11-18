## TRANSLATIONS

* Uses the react-i18next library

* To add a new translation, first add the language two letter ICO abbreviation, full name, and flag ([Twemoji](https://twitter.github.io/twemoji/2/test/preview.html)) to ./config.js Doing so will automatically add the language to the language switcher that shows in the main toolbar.

* WARNING: All translations are case and spacing sensitive. You must match translations EXACTLY. Any playing around with casing in the code WILL break translations until the right casing is also added to translation files

### ASSESS BASE

* NOTE: Adding a language will also cause the homepage to search for a 'modelImage' with the same 2 letter abbreviation attached (current naming convention is modelImageAB_xx, where xx is the language abbreviation). If none is found, it will default to the _en (english) version of the image

* All translations are kept within the ./assessments directory, each within a subdirectory titled after the language's 2 letter abbreviation (such as en, es, or de)

* There are 8 total files for each language that need to contain translations ... at a minimum, the english versions of all files should be copied into any new language directory so that a default english version is shown where actual translations are not yet available
  * The xx_AB.jsom files (where xx is the 2 letter abbreviation of the language) are built from the template.json file in the ./assessments directory
  * Similarly, the business-matrix-advanced.json, business-matrix.json, and questionnaire.json files are all copied from the respective files of the same name in the ./assessments directory
  * All fields within ./assessments/key-information-details are also copied
  * In total, there are 8 files that are required in each translation subdirectory

* If you add new keys to a file, please also add the key to the template.json file

* When adding translations to a file where none have previously existed, follow these steps:
  * import { useTranslation() } from 'react-i18next'
  * const { t } = useTranslation()
  * Wrap target text in the t() function -- Ex: t('Text to translate')
  * See assess-base/src/components/AssessmentsTable.js for an example
