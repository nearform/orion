import React from 'react'
import T from 'prop-types'
import { Assignment, AssignmentTurnedIn } from '@material-ui/icons'
import { Box, makeStyles, Typography } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { Link } from 'gatsby'
import HeadedAsidePanel from '../headed-aside-panel'

// Common link styles for Report Links, including spacing and text formatting options
const useLinkStyles = makeStyles(theme => ({
  wrapper: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'flex-start',
  },
  icon: ({ spacing }) => ({
    color: theme.palette.secondary.main,
    marginRight: theme.spacing(spacing),
  }),
  text: ({ uppercase }) => ({
    color: theme.palette.text.primary,
    fontSize: '11px',
    textTransform: uppercase ? 'uppercase' : 'capitalize',
  }),
}))

// Handles link to feedback report with specific icon and link formatting
const FeedbackReportLink = ({
  assessment,
  visible = false,
  spacing = 2,
  text,
  uppercase = false,
}) => {
  if (visible) {
    const classes = useLinkStyles({ spacing, uppercase })

    return (
      <Link
        className={classes.wrapper}
        data-testid="feedback-report-link"
        to={`/assessment/${assessment.key}/feedback-report/#${assessment.id}`}
      >
        <Assignment className={classes.icon} />
        <Typography className={classes.text}>{text}</Typography>
      </Link>
    )
  }

  return null
}

FeedbackReportLink.propTypes = {
  assessment: T.object.isRequired,
  visible: T.bool,
  spacing: T.number,
  text: T.string.isRequired,
  uppercase: T.bool,
}

// Handles link to management report with specific icon and link formatting
const ManagementReportLink = ({
  assessment,
  visible = true,
  spacing = 2,
  text,
  uppercase = false,
}) => {
  if (visible) {
    const classes = useLinkStyles({ spacing, uppercase })
    return (
      <Link
        className={classes.wrapper}
        data-testid="management-report-link"
        to={`/assessment/${assessment.key}/management-report/#${assessment.id}`}
      >
        <AssignmentTurnedIn className={classes.icon} />
        <Typography className={classes.text}>{text}</Typography>
      </Link>
    )
  }

  return null
}

ManagementReportLink.propTypes = {
  assessment: T.object.isRequired,
  spacing: T.number,
  text: T.string.isRequired,
  uppercase: T.bool,
}

// Outputs a laid out pair of report links as per the assessment screen
const useReportLinksStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    '& > *': {
      marginBottom: theme.spacing(2),
    },
    '& > *:last-child': {
      marginBottom: 0,
    },
  },
}))

const ReportLinks = ({
  assessment,
  canViewFeedbackReport,
  canViewManagementReport,
}) => {
  const { wrapper } = useReportLinksStyles()
  const { t } = useTranslation()

  return (
    <HeadedAsidePanel title={t('Assessment Reports')}>
      {assessment && assessment.id ? (
        <Box component="nav" className={wrapper}>
          {assessment.status !== 'in-progress' ||
          assessment.key === 'questionnaire' ? (
            <FeedbackReportLink
              assessment={assessment}
              text={t('View Feedback Report')}
              uppercase
              visible={canViewFeedbackReport}
            />
          ) : (
            ''
          )}
          <ManagementReportLink
            assessment={assessment}
            text={t('View Management Report')}
            uppercase
            visible={canViewManagementReport}
          />
        </Box>
      ) : (
        <Typography>
          {t(
            'When available the Assessment feedback and management report will appear here.'
          )}
        </Typography>
      )}
    </HeadedAsidePanel>
  )
}

ReportLinks.propTypes = {
  assessment: T.object,
  canViewFeedbackReport: T.bool,
}

export { FeedbackReportLink, ManagementReportLink, ReportLinks }
