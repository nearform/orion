import React from 'react'
import { render, renderAuthenticated, fireEvent, wait } from '../test-utils'
import AssessmentsHome from './home'
import { getByText as getByElementText } from '@testing-library/react'

import HomeTemplateQueryResult from './__mocks__/HomeTemplateQueryResult.mock'
jest.mock('../components/SEO')
jest.mock('graphql-hooks', () => {
  return {
    useQuery: (query, options) => {
      const selectOption = optionsString =>
        ({
          '{"variables":{"offset":0,"limit":10,"orderBy":{"name":"asc"}}}':
            'AssessmentsTableQueryResult-YourAssessmentsASC',
          '{"variables":{"offset":0,"limit":10,"orderBy":{"name":"desc"}}}':
            'AssessmentsTableQueryResult-YourAssessmentsDESC',
          '{"variables":{"offset":0,"limit":10,"orderBy":{"created_at":"desc"}}}':
            'AssessmentsTableQueryResult-CreatedAtDESC',
          '{"variables":{"offset":0,"limit":10,"orderBy":{"created_at":"asc"}}}':
            'AssessmentsTableQueryResult-CreatedAtASC',
          '{"variables":{"offset":0,"limit":10,"orderBy":{"status":"desc"}}}':
            'AssessmentsTableQueryResult-StatusDESC',
          '{"variables":{"offset":0,"limit":10,"orderBy":{"status":"asc"}}}':
            'AssessmentsTableQueryResult-StatusASC',
          '{"variables":{"offset":10,"limit":10,"orderBy":{"created_at":"desc"}}}':
            'AssessmentsTableQueryResult-next',
        }[optionsString])
      const mockUrl = selectOption(JSON.stringify(options))

      return {
        loading: false,
        error: null,
        data: require(`./__mocks__/${mockUrl}.mock`).default,
      }
    },
  }
})

describe('<AssessmentsHome />', () => {
  test('Renders when not authenticated', () => {
    const { getByText, queryByText } = render(
      <AssessmentsHome data={HomeTemplateQueryResult} />
    )
    expect(getByText('Welcome to the DigitalEFQM Assess Base'))
    expect(queryByText('Enter Business Matrix Advanced')).toBeNull()
    expect(queryByText('Enter Business Matrix')).toBeNull()
    expect(queryByText('Enter Questionnaire')).toBeNull()
    expect(queryByText('Your assessments')).toBeNull()
  })

  test('Renders when authenticated', async () => {
    const { getByText } = renderAuthenticated(
      <AssessmentsHome data={HomeTemplateQueryResult} />
    )

    expect(getByText('Welcome to the DigitalEFQM Assess Base'))

    expect(
      getByText('Enter Business Matrix Advanced').closest('a')
    ).toHaveAttribute('href', '/assessment/efqm-2020-advanced')

    expect(getByText('Enter Business Matrix').closest('a')).toHaveAttribute(
      'href',
      '/assessment/efqm-2020'
    )

    expect(getByText('Enter Questionnaire').closest('a')).toHaveAttribute(
      'href',
      '/assessment/questionnaire'
    )
  })

  test('Assesment Table content', async () => {
    const { getByTestId, getAllByTestId } = renderAuthenticated(
      <AssessmentsHome data={HomeTemplateQueryResult} />
    )

    const titles = getAllByTestId('assessment-table-titles')
    expect(titles[0]).toHaveTextContent('Your assessments')
    expect(titles[1]).toHaveTextContent('Created At')
    expect(titles[2]).toHaveTextContent('Assessment Type')
    expect(titles[3]).toHaveTextContent('Company')
    expect(titles[4]).toHaveTextContent('Status')
    expect(titles[5]).toHaveTextContent('Management Report')
    expect(titles[6]).toHaveTextContent('Feedback')

    const names = getAllByTestId('assessment-table-name')
    expect(names.length).toBe(10)
    expect(names[0]).toHaveTextContent('Spanish test')
    expect(names[1]).toHaveTextContent('Helsinki test')
    expect(names[9]).toHaveTextContent('This Assessment')

    const dates = getAllByTestId('assessment-table-date')
    expect(dates.length).toBe(10)
    expect(dates[0]).toHaveTextContent('Thu Oct 31 2019')

    const types = getAllByTestId('assessment-table-type')
    expect(types.length).toBe(10)
    expect(types[0]).toHaveTextContent('Business Matrix Advanced')

    const companies = getAllByTestId('assessment-table-company')
    expect(companies.length).toBe(10)
    expect(companies[0]).toHaveTextContent('WillsTest')

    const status = getAllByTestId('assessment-table-status')
    expect(status.length).toBe(10)
    expect(status[0]).toHaveTextContent('submitted')

    const reportLinks = getAllByTestId('assessment-table-report')
    expect(reportLinks.length).toBe(10)
    expect(reportLinks[0]).toHaveTextContent('View')
    const reportLink = reportLinks[0].getElementsByTagName('a')
    expect(reportLink[0]).toHaveAttribute('href', '/management-report/135')

    const feedbackLinks = getAllByTestId('assessment-table-feedback')
    expect(feedbackLinks.length).toBe(10)
    expect(feedbackLinks[0]).toHaveTextContent('View')
    const feedbackLink = feedbackLinks[0].getElementsByTagName('a')
    expect(feedbackLink[0]).toHaveAttribute(
      'href',
      '/assessment/efqm-2020-advanced/feedback-report/#135'
    )

    const assessmentLinks = getAllByTestId('assessment-table-link')
    expect(assessmentLinks.length).toBe(10)
    const assessmentLink = assessmentLinks[0].getElementsByTagName('a')
    expect(assessmentLink[0]).toHaveAttribute(
      'href',
      '/assessment/efqm-2020-advanced#135'
    )

    const tableFoot = getByTestId('assessment-table-footer')
    getByElementText(tableFoot, 'Rows per page:')
    getByElementText(tableFoot, '10')
    getByElementText(tableFoot, '1-10 of 130')
  })

  test('Assesment Table with assesments sorting', async () => {
    const { getByText, getAllByTestId } = renderAuthenticated(
      <AssessmentsHome data={HomeTemplateQueryResult} />
    )
    fireEvent.click(getByText('Your assessments'))
    await wait(async () => {
      getByText('ad-test')
    })
    const ascNames = getAllByTestId('assessment-table-name')
    expect(ascNames.length).toBe(10)
    expect(ascNames[0]).toHaveTextContent('ad-test')
    fireEvent.click(getByText('Your assessments'))
    await wait(async () => {
      getByText('Zyzzyva')
    })
    const descNames = getAllByTestId('assessment-table-name')
    expect(descNames.length).toBe(10)
    expect(descNames[0]).toHaveTextContent('Zyzzyva')
  })

  test('Assesment Table with created sorting', async () => {
    const { getByText, getAllByTestId } = renderAuthenticated(
      <AssessmentsHome data={HomeTemplateQueryResult} />
    )
    // Created at is deafult so clicking it results in ASC first rather than DESC
    fireEvent.click(getByText('Created At'))
    await wait(async () => {
      getByText('Oldest Assesment')
    })
    const descNames = getAllByTestId('assessment-table-name')
    expect(descNames.length).toBe(10)
    expect(descNames[0]).toHaveTextContent('Oldest Assesment')
    fireEvent.click(getByText('Created At'))
    await wait(async () => {
      getByText('Spanish test')
    })
    const ascNames = getAllByTestId('assessment-table-name')
    expect(ascNames.length).toBe(10)
    expect(ascNames[0]).toHaveTextContent('Spanish test')
  })

  test('Assesment Table with status sorting', async () => {
    const { getByText, getAllByTestId } = renderAuthenticated(
      <AssessmentsHome data={HomeTemplateQueryResult} />
    )
    fireEvent.click(getByText('Status'))
    await wait(async () => {
      getByText('Demo Test August 30th')
    })
    const descNames = getAllByTestId('assessment-table-name')
    expect(descNames.length).toBe(10)
    expect(descNames[0]).toHaveTextContent('Demo Test August 30th')
    fireEvent.click(getByText('Status'))
    await wait(async () => {
      getByText('sdfsdffd')
    })
    const ascNames = getAllByTestId('assessment-table-name')
    expect(ascNames.length).toBe(10)
    expect(ascNames[0]).toHaveTextContent('sdfsdffd')
  })

  test('Assesment Table next and previous results', async () => {
    const { getByText, getByTestId } = renderAuthenticated(
      <AssessmentsHome data={HomeTemplateQueryResult} />
    )

    const tableFoot = getByTestId('assessment-table-footer')
    const pageLinks = tableFoot.getElementsByTagName('button')
    expect(pageLinks[0]).toBeDisabled()

    fireEvent.click(pageLinks[1])
    await wait(async () => {
      getByText('Ivan Test')
    })
    expect(pageLinks[0]).toBeEnabled()
    fireEvent.click(pageLinks[0])
    await wait(async () => {
      getByText('Spanish test')
    })
    expect(pageLinks[0]).toBeDisabled()
  })
})
