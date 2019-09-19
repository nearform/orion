import React from 'react'
import { Box, Typography, withStyles } from '@material-ui/core'
import T from 'prop-types'

import AnswerSection from '../answer-section'
import rowPadding from '../row-padding'

const Question = ({
  answers,
  answersMeta,
  answerSectionTitles,
  classes,
  pillarKey,
  questionTitles,
  title,
}) => {
  const answerCount = answers.length
  let answersOutput
  if (answerCount) {
    answersOutput = answers.map((answer, index) => {
      return (
        <div
          className={[
            classes.answerWrapper,
            classes[`${pillarKey}Pillar`],
          ].join(' ')}
          key={index}
        >
          {answersMeta.map(({ key }) => {
            let answerText = answer[key]

            // Links need to be iterated over specifically using the question titles
            // in order to be formatted correctly
            if (key === 'links') {
              answerText = answer[key]
                .map(link => {
                  const { criterionKey: partKey, pillarKey } = JSON.parse(link)
                  return questionTitles[pillarKey][partKey]
                })
                .join('\n')
            }

            return (
              <AnswerSection
                answer={answerText}
                key={key}
                prefix={String(index + 1)}
                title={answerSectionTitles[key]}
              />
            )
          })}
        </div>
      )
    })
  } else {
    answersOutput = (
      <div className={[classes.answerWrapper, classes.noAnswers].join(' ')}>
        No answers received
      </div>
    )
  }
  return (
    <Box
      className={[classes.questionWrapper]
        .concat(answerCount === 0 ? classes.questionWithoutAnswers : [])
        .join(' ')}
      component="section"
    >
      <Typography className={classes.questionHeading} component="h3">
        {title}
      </Typography>
      {answersOutput}
    </Box>
  )
}

Question.propTypes = {
  answerSectionTitles: T.object, // Formatted to get the titles for each section rather than filtering the matrix JSON everytime
  answers: T.array, // All answers (sets of answer sections)
  answersMeta: T.array, // Corresponds to columns in the matrix JSON, meta data for each answer section
  classes: T.object, // MUI
  pillarKey: T.string, // Enables pillar specific logic
  questionTitles: T.object, // Formmated to get the question titles for each links entry rather than filtering the matrix JSON everytime
  title: T.string, // Main text
}

const styles = theme => {
  let questionRowPadding = {}
  for (const [key, value] of Object.entries(rowPadding)) {
    questionRowPadding[key] = theme.spacing(value)
  }

  return {
    questionWrapper: {
      borderRadius: '3px',
      boxShadow:
        '0 0 5px 0 rgba(0, 0, 0, 0.1), 0 2px 10px 0 rgba(0, 0, 0, 0.1)',
      display: 'flex',
      flexDirection: 'column',
      marginBottom: theme.spacing(4),
      '&:last-of-type': {
        marginBottom: 0,
      },
    },
    questionWithoutAnswers: {
      color: theme.palette.grey[500],
    },
    questionHeading: Object.assign({}, questionRowPadding, {
      fontSize: '12px',
      fontWeight: '700',
      textTransform: 'uppercase',
    }),
    answerWrapper: {
      borderTopWidth: '2px',
      borderTopStyle: 'solid',
    },
    noAnswers: Object.assign({}, questionRowPadding, {
      borderTopColor: theme.palette.grey[100],
    }),
    directionPillar: {
      borderTopColor: theme.taxonomyColor.C3,
    },
    executionPillar: {
      borderTopColor: theme.taxonomyColor.C2,
    },
    resultsPillar: {
      borderTopColor: theme.taxonomyColor.C4,
    },
  }
}

export default withStyles(styles)(Question)
