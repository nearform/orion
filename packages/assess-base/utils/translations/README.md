### NOTES

* All translations are case and spacing sensitive. You must match translations EXACTLY. Any playing around with casing in the code WILL break translations until the right casing is also added to translation files

* Each translation language is separated into its own .json file, named for the language

* Each .json language file is included within ../i18n.js, keyed by its two-letter language abbreviation

* To create a new .json language file, copy template.json and simply fill in the translation values for each of the english-language keys. Everything else has been taken care of for you

* If you add new keys to a file, please also add the key to the template.json file

* Remember that there are additional translation files in packages/efqm-theme/assessments/{language_abbreviation} ... it is in this location where all translations for assessment content are located

* If you add new keys to a file, you might need to import { useTranslation() } from 'react-i18next', inside of your function add const { t } = useTranslation() and then wrap your target text in the t() function -- Ex: t('Text to translate') -- An easy-to-reference example lies in assess-base/src/components/AssessmentsTable.js