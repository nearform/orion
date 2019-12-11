import React from 'react'
import TestRenderer from 'react-test-renderer'

import assessment from '../../../__mocks__/assessment.mock'
import { FeedbackReportLink, ManagementReportLink, ReportLinks } from './'

const feedbackLinkPredicate = el =>
  el.props['data-testid'] === 'feedback-report-link' && el.type === 'a'
const managementLinkPredicate = el =>
  el.props['data-testid'] === 'management-report-link' && el.type === 'a'
const linkText = 'Testing'
const linkTextPredicate = el => el.children[0] === linkText

describe('<FeedbackReportLink />', () => {
  let feedbackReportLink

  beforeAll(() => {
    feedbackReportLink = TestRenderer.create(
      <FeedbackReportLink assessment={assessment} text="Testing" visible />
    ).root
  })

  test('is a link with the correct URL based on the provided assessment', () => {
    const link = feedbackReportLink.find(feedbackLinkPredicate)
    expect(link.props.href).toEqual(
      '/assessment/efqm-2020-advanced/feedback-report/#123'
    )
  })

  test('uses the text provided', () => {
    expect(feedbackReportLink.findAll(linkTextPredicate).length).toEqual(1)
  })

  describe('with visisble set to false', () => {
    let feedbackReportLinkHidden

    beforeAll(() => {
      feedbackReportLinkHidden = TestRenderer.create(
        <FeedbackReportLink
          assessment={assessment}
          text="Testing"
          visible={false}
        />
      ).root
    })

    test('does not have a feedback report link', () => {
      expect(
        feedbackReportLinkHidden.findAll(feedbackLinkPredicate).length
      ).toEqual(0)
    })
  })
})

describe('<ManagementReportLink />', () => {
  let managementReportLink

  beforeAll(() => {
    managementReportLink = TestRenderer.create(
      <ManagementReportLink assessment={assessment} text="Testing" />
    ).root
  })

  test('is a link with the correct URL based on the provided assessment', () => {
    const link = managementReportLink.find(managementLinkPredicate)
    expect(link.props.href).toEqual(
      '/assessment/efqm-2020-advanced/management-report/#123'
    )
  })

  test('uses the text provided', () => {
    expect(managementReportLink.findAll(linkTextPredicate).length).toEqual(1)
  })
})

describe('<ReportLinks />', () => {
  let reportLinks

  beforeAll(() => {
    reportLinks = TestRenderer.create(
      <ReportLinks assessment={assessment} canViewFeedbackReport />
    ).root
  })

  test('is a single nav', () => {
    const nav = reportLinks.findAll(el => el.type === 'nav')
    expect(nav.length).toEqual(1)
  })

  test('has the correct heading', () => {
    const heading = reportLinks.find(el => el.type === 'h3')
    expect(heading.children[0]).toEqual('Assessment Reports')
  })

  test('has a management report link', () => {
    expect(reportLinks.findAll(managementLinkPredicate).length).toEqual(1)
  })

  test('has a feedback report link', () => {
    expect(reportLinks.findAll(feedbackLinkPredicate).length).toEqual(1)
  })

  describe('with canViewFeedbackReport set to false', () => {
    let reportLinksWithFeedbackLinkHidden

    beforeAll(() => {
      reportLinksWithFeedbackLinkHidden = TestRenderer.create(
        <ReportLinks assessment={assessment} canViewFeedbackReport={false} />
      ).root
    })

    test('does not have a feedback report link', () => {
      expect(
        reportLinksWithFeedbackLinkHidden.findAll(feedbackLinkPredicate).length
      ).toEqual(0)
    })
  })

  describe('when theres no data yet', () => {
    let defaultReportLinks

    beforeAll(() => {
      defaultReportLinks = TestRenderer.create(
        <ReportLinks assessment={undefined} />
      ).root
    })

    test('theres just a bit of text (as well as the heading)', () => {
      expect(defaultReportLinks.findAll(el => el.type === 'p').length).toEqual(
        1
      )
    })
  })
})
