import React from 'react'
import {
  renderAuthenticatedPlatformAdmin,
  renderAuthenticatedPartnerAdmin,
  fireEvent,
  wait,
  cleanup,
} from '../test-utils'
import AssessmentTemplate from './assessment'
import {
  getByText as getByElementText,
  getByTestId as getByElementTestId,
} from '@testing-library/react'

import newAssessmentPageContextMock from './__mocks__/assessment-new-pageContext.mock'
import newLocationMock from './__mocks__/assessment-new-location.mock'
import locationMock from './__mocks__/assessment-location.mock'
import submittedLocationMock from './__mocks__/assessment-location-submitted.mock'
import { navigate } from '../../__mocks__/gatsby'

jest.mock('../components/SEO')
jest.mock('../components/ContentModal')
jest.mock('@reach/router', () => ({
  Redirect: 'Redirected',
}))
jest.mock('../utils/storage', () => require('../utils/__mock__/storage'))

jest.mock('components', () => ({
  ...jest.requireActual('components'),
  GROUP_TYPES: {},
  ConfirmDialog: jest.fn(),
}))
const components = require('components')
components.ConfirmDialog.mockImplementation(() => 'Dialogue')

jest.mock('../queries', () => ({
  createAssessmentMutation: 'createAssessmentMutation',
  getShallowAssessmentData: 'getShallowAssessmentData',
  createFileUploadMutation: 'createFileUploadMutation',
  updateAssessmentKeyInfoMutation: 'updateAssessmentKeyInfoMutation',
  updateAssessmentStatusMutation: 'updateAssessmentStatusMutation',
  getAssessmentContributorsAssessorsData:
    'getAssessmentContributorsAssessorsData',
}))

jest.mock('graphql-hooks', () => ({
  ...jest.requireActual('graphql-hooks'),
  useMutation(mutationName) {
    return [
      options => {
        const selectOption = optionsString =>
          ({
            'createAssessmentMutation-{"variables":{"key":"efqm-2020-advanced","name":"New Assessment Test","internal":false,"owner_id":1}}':
              'createAssessmentMutation-new',
            'createFileUploadMutation-{"variables":{"fileUploadData":{"user_id":1,"assessment_id":159,"file_name":"test-file.png","file_size":9,"s3_key":"uploaded-for-159"}}}':
              'createFileUploadMutation',
            'updateAssessmentKeyInfoMutation-{"variables":{"id":159,"keyInfo":{"overview":"new facts and figures","challenges-and-strategy":"new challenges and strategy","operations-partners-suppliers":"new operations, partners and suppliers","market-offerings-and-customers":"new offerings and customers","management-structure":"new structure and activities"}}}':
              'createAssessmentMutation-new',
          }[optionsString])
        const mockUrl = selectOption(
          `${mutationName}-${JSON.stringify(options)}`
        )
        return require(`./__mocks__/assessment-${mockUrl}.mock`).default
      },
    ]
  },
  useManualQuery(queryName, options) {
    const selectOption = optionsString =>
      ({
        'getShallowAssessmentData-{"id":159}': 'getShallowAssessmentData',
        'getShallowAssessmentData-{"id":null}': 'getShallowAssessmentData-null',
        'getShallowAssessmentData-{"id":160}':
          'getShallowAssessmentData-submitted',
        'getAssessmentContributorsAssessorsData-{"assessmentId":null}':
          'getAssessmentContributorsAssessorsData-null',
        'getAssessmentContributorsAssessorsData-{"assessmentId":159}':
          'getAssessmentContributorsAssessorsData',
        'getAssessmentContributorsAssessorsData-{"assessmentId":160}':
          'getAssessmentContributorsAssessorsData',
      }[optionsString])
    const mockUrl = selectOption(
      `${queryName}-${JSON.stringify(options.variables)}`
    )

    const result = {
      data: require(`./__mocks__/assessment-${mockUrl}.mock`).default,
    }

    // This should be a refetch. It fires but does not result in a page render.
    return [
      options => {
        const result = {
          data: require(`./__mocks__/assessment-${mockUrl}-refetch.mock`)
            .default,
        }
        return result
      },
      result,
    ]
  },
}))

afterEach(cleanup)

describe('<AssessmentTemplate />', () => {
  test.todo(
    'The commented out test should result in a redirect to auth. It renders the page, This will be fixed by #812'
  )
  //   test('Renders when not authenticated', () => {
  //     const { getByText, queryByText } = render(
  //       <AssessmentTemplate
  //         pageContext={newAssessmentPageContextMock}
  //         location={newLocationMock}
  //       />
  //     )
  // })

  test('Renders a new assessment when user is platform-admin', () => {
    const {
      getByText,
      getByTestId,
      queryAllByTestId,
    } = renderAuthenticatedPlatformAdmin(
      <AssessmentTemplate
        pageContext={newAssessmentPageContextMock}
        location={newLocationMock}
      />
    )

    const homeLink = getByText('◀ Assess base home')
    expect(homeLink).toHaveAttribute('href', '/')

    getByText('Business Matrix Advanced')

    expect(getByTestId('name').outerHTML).toMatch(/displayNone/)
    expect(getByTestId('create').outerHTML).not.toMatch(/displayNone/)

    getByText('Enter your assessment name')
    const name = getByTestId('create-name').getElementsByTagName('input')[0]
    expect(name).toHaveValue('')
    expect(name).toBeEnabled()

    getByText('Internal')
    const internal = getByTestId('create-internal').getElementsByTagName(
      'input'
    )[0]
    expect(internal.checked).toBe(true)
    expect(internal).toBeEnabled()

    expect(getByText('Create Assessment')).toBeDisabled()
    getByText('Assign Contributors and Assessors')
    expect(queryAllByTestId('key-information').length).toBe(1)
  })

  test('Renders a new assessment when user is partner-admin', () => {
    const {
      getByText,
      queryByText,
      getByTestId,
      queryAllByTestId,
    } = renderAuthenticatedPartnerAdmin(
      <AssessmentTemplate
        pageContext={newAssessmentPageContextMock}
        location={newLocationMock}
      />
    )
    const homeLink = getByText('◀ Assess base home')
    expect(homeLink).toHaveAttribute('href', '/')

    getByText('Business Matrix Advanced')

    expect(getByTestId('name').outerHTML).toMatch(/displayNone/)
    expect(getByTestId('create').outerHTML).not.toMatch(/displayNone/)

    getByText('Enter your assessment name')
    const name = getByTestId('create-name').getElementsByTagName('input')[0]
    expect(name).toHaveValue('')
    expect(name).toBeEnabled()

    getByText('Internal')
    const internal = getByTestId('create-internal').getElementsByTagName(
      'input'
    )[0]
    expect(internal.checked).toBe(true)
    expect(internal).toBeEnabled()

    expect(getByText('Create Assessment')).toBeDisabled()
    expect(queryAllByTestId('key-information').length).toBe(1)
    expect(queryByText('Assign Contributors and Assessors')).toBeNull()
  })

  test('Create a new assessment', async () => {
    const { getByText, getByTestId } = renderAuthenticatedPartnerAdmin(
      <AssessmentTemplate
        pageContext={newAssessmentPageContextMock}
        location={newLocationMock}
      />
    )
    const homeLink = getByText('◀ Assess base home')
    expect(homeLink).toHaveAttribute('href', '/')

    getByText('Business Matrix Advanced')
    getByText('Business Matrix Advanced')

    const newAssessmentName = getByTestId('create').getElementsByTagName(
      'input'
    )[0]
    const internal = getByTestId('create-internal').getElementsByTagName(
      'input'
    )[0]
    const createAssessment = getByText('Create Assessment')
    fireEvent.change(newAssessmentName, {
      target: { value: 'New Assessment Test' },
    })
    fireEvent.click(internal)

    await wait(async () => {
      expect(createAssessment).toBeEnabled()
      expect(internal.checked).toBe(false)
    })

    fireEvent.click(createAssessment)
    await wait(async () => {
      expect(navigate).toHaveBeenCalledWith(
        '/assessment/efqm-2020-advanced/#159'
      )
    })
  })

  test('Existing assessment renders', async () => {
    const {
      getByText,
      getByTestId,
      queryAllByTestId,
    } = renderAuthenticatedPlatformAdmin(
      <AssessmentTemplate
        pageContext={newAssessmentPageContextMock}
        location={locationMock}
      />
    )
    const homeLink = getByText('◀ Assess base home')
    expect(homeLink).toHaveAttribute('href', '/')

    getByText('Business Matrix Advanced')

    expect(getByTestId('name').outerHTML).not.toMatch(/displayNone/)
    expect(getByTestId('create').outerHTML).toMatch(/displayNone/)

    getByText('external assessment name')
    getByText('New Assessment Test')

    const assignUsers = getByText('Assign Contributors and Assessors')
    expect(assignUsers).toHaveAttribute(
      'href',
      '/assessment/efqm-2020-advanced/contributors-assessors#159'
    )

    getByText('Assign Contributors and Assessors')
    const people = queryAllByTestId('typed-chip')
    getByText('Assessor 1')
    expect(people.length).toBe(4)
    getByElementText(people[0], 'Assessor 1')
    getByElementText(people[0], 'Assessor')
    getByElementText(people[1], 'Assessor 2')
    getByElementText(people[1], 'Assessor')
    getByElementText(people[2], 'Contributor 1')
    getByElementText(people[2], 'Contributor')
    getByElementText(people[3], 'Contributor 2')
    getByElementText(people[3], 'Contributor')

    const overview = getByTestId('keyinfo-overview')
    getByElementText(overview, 'facts & figures')
    expect(overview.getElementsByTagName('textarea')[0]).toHaveTextContent(
      'Key information - facts and figures'
    )
    fireEvent.click(getByElementText(overview, 'More Info'))
    await wait(async () => {
      getByTestId('content-modal')
      const moreInfo = getByTestId('content-modal')
      getByElementText(moreInfo, 'Key Information')
      getByElementText(moreInfo, 'facts & figures')
      expect(moreInfo.innerHTML).toMatch(/You could include/)
    })

    const challenges = getByTestId('keyinfo-challenges-and-strategy')
    getByElementText(challenges, 'challenges & strategy')
    expect(challenges.getElementsByTagName('textarea')[0]).toHaveTextContent(
      'Key information - challenges and strategy'
    )
    fireEvent.click(getByElementText(challenges, 'More Info'))
    await wait(async () => {
      getByTestId('content-modal')
      const moreInfo = getByTestId('content-modal')
      getByElementText(moreInfo, 'Key Information')
      getByElementText(moreInfo, 'challenges & strategy')
      expect(moreInfo.innerHTML).toMatch(/Identify and describe/)
    })

    const operations = getByTestId('keyinfo-operations-partners-suppliers')
    getByElementText(operations, 'operations, partners & suppliers')
    expect(operations.getElementsByTagName('textarea')[0]).toHaveTextContent(
      'Key information - operations, partners and suppliers'
    )
    fireEvent.click(getByElementText(operations, 'More Info'))
    await wait(async () => {
      getByTestId('content-modal')
      const moreInfo = getByTestId('content-modal')
      getByElementText(moreInfo, 'Key Information')
      getByElementText(moreInfo, 'operations, partners & suppliers')
      expect(moreInfo.innerHTML).toMatch(/Please note that/)
    })

    const market = getByTestId('keyinfo-market-offerings-and-customers')
    getByElementText(market, 'market, offerings and customers')
    expect(market.getElementsByTagName('textarea')[0]).toHaveTextContent(
      'Key information - offerings and customers'
    )
    fireEvent.click(getByElementText(market, 'More Info'))
    await wait(async () => {
      getByTestId('content-modal')
      const moreInfo = getByTestId('content-modal')
      getByElementText(moreInfo, 'Key Information')
      getByElementText(moreInfo, 'market, offerings and customers')
      expect(moreInfo.innerHTML).toMatch(/Please note that/)
    })

    const management = getByTestId('keyinfo-management-structure')
    getByElementText(management, 'management structure and activities')
    expect(management.getElementsByTagName('textarea')[0]).toHaveTextContent(
      'Key information - structure and activities'
    )
    fireEvent.click(getByElementText(management, 'More Info'))
    await wait(async () => {
      getByTestId('content-modal')
      const moreInfo = getByTestId('content-modal')
      getByElementText(moreInfo, 'Key Information')
      getByElementText(moreInfo, 'management structure and activities')
      expect(moreInfo.innerHTML).toMatch(/Please note that/)
    })

    getByText('upload key information')
    expect(getByText('Save Updates')).toBeDisabled()
  })

  test('Existing assessment side panel renders', () => {
    const { queryAllByTestId, getByText } = renderAuthenticatedPlatformAdmin(
      <AssessmentTemplate
        pageContext={newAssessmentPageContextMock}
        location={locationMock}
      />
    )
    getByText('View Management Report')
    const sidePanels = queryAllByTestId('headed-aside-panel')
    expect(sidePanels.length).toBe(2)

    getByElementText(sidePanels[0], 'Assessment Reports')

    const managementLink = getByElementTestId(
      sidePanels[0],
      'management-report-link'
    )
    expect(managementLink).toHaveAttribute('href', '/management-report/159')
    expect(managementLink).toHaveTextContent('View Management Report')

    getByElementText(sidePanels[1], 'Assessment Documents')
    getByElementText(sidePanels[1], 'test-upload.rtf')
    getByElementText(sidePanels[1], 'test-upload2.rtf')
  })

  test.todo(
    'The following test is unfinished. useAuthorizedQuery.refresh does not currently result in data returning to AssessmentTemplate when triggered in the test'
  )
  test('Upload a new document', async () => {
    const { getByTestId } = renderAuthenticatedPlatformAdmin(
      <AssessmentTemplate
        pageContext={newAssessmentPageContextMock}
        location={locationMock}
      />
    )

    const file = new File(['test-file'], 'test-file.png', { type: 'image/png' })
    const uploadButton = getByTestId('upload-assessment').getElementsByTagName(
      'input'
    )[0]
    Object.defineProperty(uploadButton, 'files', {
      value: [file],
    })
    fireEvent.change(uploadButton)
    // await wait(async () => {
    //   const sidePanels = queryAllByTestId('headed-aside-panel')
    //   expect(sidePanels.length).toBe(3)
    // })
  })

  test('Subcriteria render', () => {
    const { getByTestId } = renderAuthenticatedPlatformAdmin(
      <AssessmentTemplate
        pageContext={newAssessmentPageContextMock}
        location={locationMock}
      />
    )

    const subcriteria = getByTestId('assessment__model-areas')
    getByElementText(subcriteria, 'direction')
    expect(
      getByElementText(subcriteria, 'purpose, vision & strategy')
    ).toHaveAttribute(
      'href',
      '/assessment/efqm-2020-advanced/direction/purpose-strategy#159'
    )
    expect(
      getByElementText(subcriteria, 'Organisational Culture & Leadership')
    ).toHaveAttribute(
      'href',
      '/assessment/efqm-2020-advanced/direction/leadership-culture#159'
    )

    getByElementText(subcriteria, 'execution')
    expect(
      getByElementText(subcriteria, 'Engaging Stakeholders')
    ).toHaveAttribute(
      'href',
      '/assessment/efqm-2020-advanced/execution/engaging-stakeholders#159'
    )
    expect(
      getByElementText(subcriteria, 'Organisational Culture & Leadership')
    ).toHaveAttribute(
      'href',
      '/assessment/efqm-2020-advanced/direction/leadership-culture#159'
    )
    expect(
      getByElementText(subcriteria, 'Driving Performance & Transformation')
    ).toHaveAttribute(
      'href',
      '/assessment/efqm-2020-advanced/execution/driving-performance#159'
    )

    getByElementText(subcriteria, 'results')
    expect(
      getByElementText(subcriteria, 'Stakeholder Perceptions')
    ).toHaveAttribute(
      'href',
      '/assessment/efqm-2020-advanced/results/stakeholder-perceptions#159'
    )
    expect(
      getByElementText(subcriteria, 'Strategic & Operational Performance')
    ).toHaveAttribute(
      'href',
      '/assessment/efqm-2020-advanced/results/strategic-performance#159'
    )
  })

  test.todo(
    'The following test is unfinished. useAuthorizedQuery.refresh does not currently result in data returning to AssessmentTemplate when triggered in the test'
  )
  test('Edit and save key information', async () => {
    const { getByText } = renderAuthenticatedPlatformAdmin(
      <AssessmentTemplate
        pageContext={newAssessmentPageContextMock}
        location={locationMock}
      />
    )

    const saveButton = getByText('Save Updates')
    expect(saveButton).toBeDisabled()

    fireEvent.change(getByText('Key information - facts and figures'), {
      target: { value: 'new facts and figures' },
    })
    expect(saveButton).toBeEnabled()

    fireEvent.change(getByText('Key information - challenges and strategy'), {
      target: { value: 'new challenges and strategy' },
    })
    fireEvent.change(
      getByText('Key information - operations, partners and suppliers'),
      {
        target: { value: 'new operations, partners and suppliers' },
      }
    )
    fireEvent.change(getByText('Key information - offerings and customers'), {
      target: { value: 'new offerings and customers' },
    })
    fireEvent.change(getByText('Key information - structure and activities'), {
      target: { value: 'new structure and activities' },
    })

    fireEvent.click(saveButton)
    // await wait(async () => {
    //   expect(saveButton).toBeDisabled()

    //   // getByText('new facts and figures')
    //   // getByText('new challenges and strategy')
    //   // getByText('new operations, partners and suppliers')
    //   // getByText('new offerings and customers')
    //   // getByText('new structure and activities')
    // })
  })

  test.todo(
    'The following test is unfinished. useAuthorizedQuery.refresh does not currently result in data returning to AssessmentTemplate when triggered in the test'
  )
  test('Submit assessment', async () => {
    components.ConfirmDialog.mockImplementation(
      ({ title, text, children, onConfirm, onCancel }) => {
        return (
          <div
            data-testid={
              title === 'Submit Assessment Filename'
                ? 'confirm-dialog'
                : 'humbug'
            }
          >
            <h4>{title}</h4>
            <div>{text}</div>
            <div>{children}</div>
            <div onClick={onConfirm}>Confirm</div>
            <div onClick={onCancel}>Cancel</div>
          </div>
        )
      }
    )

    const { getByTestId, getByText } = renderAuthenticatedPlatformAdmin(
      <AssessmentTemplate
        pageContext={newAssessmentPageContextMock}
        location={locationMock}
      />
    )
    const submit = getByText('Submit Assessment')
    expect(submit).toBeEnabled()
    fireEvent.click(submit)
    await wait(async () => {
      getByTestId('confirm-dialog')
    })
    const submitModal = getByTestId('confirm-dialog')
    getByElementText(submitModal, 'Submit Assessment Filename')
    expect(submitModal.innerHTML).toMatch(/This assessment will be/)

    // Submit and cancel processes are not tested
  })

  test('Test submitted assessment', () => {
    const { getByTestId, queryByText } = renderAuthenticatedPlatformAdmin(
      <AssessmentTemplate
        pageContext={newAssessmentPageContextMock}
        location={submittedLocationMock}
      />
    )

    const overview = getByTestId('keyinfo-overview')
    expect(overview.getElementsByTagName('textarea')[0]).toBeDisabled()

    const challenges = getByTestId('keyinfo-challenges-and-strategy')
    expect(challenges.getElementsByTagName('textarea')[0]).toBeDisabled()

    const operations = getByTestId('keyinfo-operations-partners-suppliers')
    expect(operations.getElementsByTagName('textarea')[0]).toBeDisabled()

    const market = getByTestId('keyinfo-market-offerings-and-customers')
    expect(market.getElementsByTagName('textarea')[0]).toBeDisabled()

    const management = getByTestId('keyinfo-management-structure')
    expect(management.getElementsByTagName('textarea')[0]).toBeDisabled()

    expect(queryByText('Submit Assessment')).toBeNull()
    expect(queryByText('Save Updates')).toBeNull()
    expect(queryByText('upload key information')).toBeNull()

    const report = getByTestId('feedback-report-link')
    expect(report).toHaveAttribute(
      'href',
      '/assessment/efqm-2020-advanced/feedback-report/#160'
    )
  })
})
