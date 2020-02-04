import addTranslations from './add-translation'

const fakeI18next = () => ({
  resources: [],
  addResourceBundle(lng, ns, resources) {
    this.resources.push({ lng, ns, resources })
  },
})

describe('addTranslations', () => {
  let i18next

  beforeEach(() => {
    i18next = fakeI18next()
  })

  it('should not add any resources if empty array provided', () => {
    addTranslations('', i18next, [])

    expect(i18next.resources.length).toBe(0)
  })

  it('should not add any translations if no resources', () => {
    addTranslations(
      [
        {
          name: 'whatever',
        },
      ],
      i18next
    )

    expect(i18next.resources.length).toBe(0)
  })

  it('should add one simple translation', () => {
    addTranslations('', i18next, [
      {
        name: 'whatever',
        translations: {
          de: {
            name: 'a translated name',
          },
        },
      },
    ])

    expect(i18next.resources.length).toBe(1)

    expect(i18next.resources[0]).toEqual({
      lng: 'de',
      ns: 'translation',
      resources: {
        whatever: 'a translated name',
      },
    })
  })

  it('should add one simple translation to multiple languages', () => {
    addTranslations('', i18next, [
      {
        name: 'whatever',
        translations: {
          de: {
            name: 'a german translated name',
          },
          fr: {
            name: 'a french translated name',
          },
        },
      },
    ])

    expect(i18next.resources.length).toBe(2)

    expect(i18next.resources[0]).toEqual({
      lng: 'de',
      ns: 'translation',
      resources: {
        whatever: 'a german translated name',
      },
    })

    expect(i18next.resources[1]).toEqual({
      lng: 'fr',
      ns: 'translation',
      resources: {
        whatever: 'a french translated name',
      },
    })
  })

  it('should add two simple translations', () => {
    addTranslations('', i18next, [
      {
        name: 'whatever',
        description: 'a description',
        translations: {
          de: {
            name: 'a translated name',
            description: 'a translated description',
          },
        },
      },
    ])

    expect(i18next.resources.length).toBe(1)

    expect(i18next.resources[0]).toEqual({
      lng: 'de',
      ns: 'translation',
      resources: {
        whatever: 'a translated name',
        'a description': 'a translated description',
      },
    })
  })

  it('should add nested translations', () => {
    addTranslations('', i18next, [
      {
        name: 'parent name',
        translations: {
          de: {
            name: 'translated parent name',
          },
        },
        children: [
          {
            name: 'child name',
            translations: {
              de: {
                name: 'translated child name',
              },
            },
          },
        ],
      },
    ])

    expect(i18next.resources.length).toBe(2)

    expect(i18next.resources[0]).toEqual({
      lng: 'de',
      ns: 'translation',
      resources: {
        'parent name': 'translated parent name',
      },
    })

    expect(i18next.resources[1]).toEqual({
      lng: 'de',
      ns: 'translation',
      resources: {
        'child name': 'translated child name',
      },
    })
  })
})
