import { validateAssessment } from './'

it('should successfully validate assessment data against JSON schema', () => {
  const assessment = {
    key: 'questionnaire',
    name: 'questionnaire',
    orderIndex: 1,
    logoAsset: 'assess-1-img',
    shortDescription: 'Reference determining excellence booklet',
    keyInformation: {},
    pillars: [],
  }
  expect(validateAssessment(assessment).valid).toEqual(true)
})

it('should fail validating invalid assessment data against JSON schema', () => {
  const assessment = {
    key: 'bad key',
    name: 'questionnaire',
    logoAsset: 'assess-1-img',
    shortDescription: 'Reference determining excellence booklet',
    keyInformation: {},
    pillars: [],
  }
  const result = validateAssessment(assessment)

  expect(result.valid).toEqual(false)
  expect(result.errors).toBeInstanceOf(Array)
  expect(result.errors).toHaveLength(2)

  expect(result.errors[0]).toEqual(
    expect.objectContaining({
      keyword: 'pattern',
      dataPath: '.key',
      message: 'should match pattern "^[a-zA-Z0-9_-]+$"',
    })
  )

  expect(result.errors[1]).toEqual(
    expect.objectContaining({
      keyword: 'required',
      dataPath: '',
      message: "should have required property 'orderIndex'",
    })
  )
})
