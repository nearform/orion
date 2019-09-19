import React, { Fragment, useEffect } from 'react'
import T from 'prop-types'
import matrixData from 'efqm-theme/assessments'
import { Box, withStyles } from '@material-ui/core'

import { PaddedContainer } from 'components'
import { useManualQuery } from 'graphql-hooks'

import HeadedSection from '../components/management-report/headed-section'
import HeadedSubSection from '../components/management-report/headed-sub-section'
import Header from '../components/management-report/header'
import Question from '../components/management-report/question'
import { getManagementReportData } from '../queries'
import { useIsAuthInitialized } from '../utils/auth'

function ManagementReport({ assessmentId, classes }) {
  const isAuthInitialized = useIsAuthInitialized()

  const [fetchManagementReportData, { data }] = useManualQuery(
    getManagementReportData,
    { variables: { assessmentId } }
  )

  useEffect(() => {
    fetchManagementReportData()
  }, [isAuthInitialized])

  if (!data) {
    return null
  }

  // Retrieve the assessment meta data
  const [businessMatrixAdvanced] = matrixData.filter(
    ({ key }) => key === 'efqm-2020-advanced'
  )

  // Destructure the relevant from the assessment meta data
  const {
    keyInformation: { keyInformationItems: keyInfoItemsMeta },
    pillars: pillarsMeta,
    columns: answersMeta,
  } = businessMatrixAdvanced

  // avoid filtering for every answer
  const answerSectionTitles = {}
  answersMeta.forEach(({ name, key }) => {
    answerSectionTitles[key] = name
  })
  // avoid filtering for every answer also, this does the link output
  const questionTitles = {}
  pillarsMeta.forEach(({ key: pillarKey, criteria }) => {
    questionTitles[pillarKey] = {}
    criteria.forEach(({ parts }) =>
      parts.forEach(({ tables }) =>
        tables.forEach(
          ({ key, name }) => (questionTitles[pillarKey][key] = name)
        )
      )
    )
  })

  // Destructure the data from the assessment query
  const {
    assessment: [assessment],
    assessment: [{ key_information: assessmentKeyInfo }],
    assessment_criterion_data: assessmentCriteria,
    assessment_table: assessmentParts,
  } = data

  return (
    <Box className={classes.pageContainer} component="article">
      <PaddedContainer>
        <Header assessment={assessment} />
        <HeadedSection pillar="default" title="Key Information">
          {// Output the key info summary section (page intro)
          keyInfoItemsMeta.map(({ key, name }) => (
            <HeadedSubSection
              body={assessmentKeyInfo[key]}
              key={key}
              title={name}
            />
          ))}
        </HeadedSection>

        {// Loop over three pillars
        pillarsMeta.map(({ criteria: criteriaMeta, key: pillarKey }) => {
          // Loop over each criterion (set of questions)
          return criteriaMeta.map(
            ({ key: criterionKey, name: criterionName, parts: partsMeta }) => {
              // Get assessment data from this criterion, for example, the summary paragraph
              // Provide a default if no data is entered for this criteria yet
              const [
                { data: { summary } } = { data: { summary: null } },
              ] = assessmentCriteria.filter(
                ({ criterion_key }) => criterion_key === criterionKey
              )

              // Create a section with header to hold all of this criterion's questions
              return (
                <Fragment key={criterionKey}>
                  <HeadedSection pillar={pillarKey} title={criterionName}>
                    {summary && (
                      <HeadedSubSection title="Summary" body={summary} />
                    )}
                  </HeadedSection>
                  {// Loop over each part (question)
                  partsMeta.map(({ tables: [{ key, name }] }) => {
                    // Extract the answers, providing a fallback empty array if there's none yet for this
                    // question
                    const [
                      { table_values: answers } = { table_values: [] },
                    ] = assessmentParts.filter(
                      ({ criterion_key, table_key }) =>
                        table_key === key && criterion_key === criterionKey
                    )
                    return (
                      <Question
                        answers={answers}
                        answersMeta={answersMeta}
                        answerSectionTitles={answerSectionTitles}
                        key={key}
                        pillarKey={pillarKey}
                        questionTitles={questionTitles}
                        title={name}
                      />
                    )
                  })}
                </Fragment>
              )
            }
          )
        })}
      </PaddedContainer>
    </Box>
  )
}

ManagementReport.propTypes = {
  assessmentId: T.string.isRequired,
  classes: T.object.isRequired,
}

const styles = theme => ({
  outpur: {
    border: '1px solid white',
    borderRadius: '2px',
    backgroundColor: 'rgba(255,255,255, 0.85)',
    color: theme.palette.primary.dark,
    margin: '10px',
    padding: '10px',
  },
})

export default withStyles(styles, { withTheme: true })(ManagementReport)
