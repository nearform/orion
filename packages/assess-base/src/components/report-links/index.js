import React from 'react'
import T from 'prop-types'
import { Assignment, AssignmentTurnedIn } from '@material-ui/icons'
import { Box, makeStyles, Typography } from '@material-ui/core'
import { Link } from 'gatsby'

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
        data-test-id="feedback-report-link"
        to={`assessment/${assessment.key}/feedback-report/#${assessment.id}`}
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
  spacing = 2,
  text,
  uppercase = false,
}) => {
  const classes = useLinkStyles({ spacing, uppercase })
  return (
    <Link
      className={classes.wrapper}
      data-test-id="management-report-link"
      to={`management-report/${assessment.id}`}
    >
      <AssignmentTurnedIn className={classes.icon} />
      <Typography className={classes.text}>{text}</Typography>
    </Link>
  )
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

const ReportLinks = ({ assessment, canViewFeedbackReport }) => {
  const classes = useReportLinksStyles()
  return (
    <Box className={classes.wrapper} component="nav">
      <Typography className={classes.heading} variant="h3">
        Assessment Reports
      </Typography>
      <FeedbackReportLink
        assessment={assessment}
        text="View Feedback Report"
        uppercase
        visible={canViewFeedbackReport}
      />
      <ManagementReportLink
        assessment={assessment}
        text="View Management Report"
        uppercase
      />
    </Box>
  )
}

ReportLinks.propTypes = {
  assessment: T.object.isRequired,
  canViewFeedbackReport: T.bool,
}

export { FeedbackReportLink, ManagementReportLink, ReportLinks }
