import React from 'react'
import { withStyles, TableRow, TableCell, IconButton } from '@material-ui/core'
import { Link } from 'gatsby'
import ChevronRightIcon from '@material-ui/icons/ChevronRightRounded'
import { useTranslation } from 'react-i18next'
import get from 'lodash/get'

import { AssessmentStatusChip } from 'components'
import { getAssessmentsData } from '../queries'
import { formatDate } from '../utils/date'
import QueryTable from './QueryTable'
import { FeedbackReportLink, ManagementReportLink } from './report-links'
import { getAssessmentTypeNames } from 'efqm-theme/assessments/getAssessmentParts'

function AssessmentsTable({ classes }) {
  const { t, i18n } = useTranslation()
  const lang = i18n.language
  const assessmentTypeNames = getAssessmentTypeNames(lang)

  const headers = [
    { id: 'name', label: t('Your assessments'), sortable: true },
    { id: 'created_at', label: t('Created At'), sortable: true },
    { id: 'assessmentType', label: t('Assessment Type') },
    { id: 'company', label: t('Company') },
    { id: 'status', label: t('Status'), sortable: true },
    {
      id: 'management',
      label: t('Management Report'),
      cellProps: {
        style: {
          width: '80px',
        },
      },
    },
    { id: 'feedback', label: t('Feedback') },
    { id: 'link', label: '' },
  ]

  return (
    <QueryTable
      headers={headers}
      query={getAssessmentsData}
      orderBy={{ created_at: 'desc' }}
      renderTableBody={data =>
        data.assessment.map((assessment, index) => {
          const { id, key, name: title, created_at, status } = assessment
          return (
            <TableRow hover key={index} size="small">
              <TableCell data-testid="assessment-table-name">{title}</TableCell>
              <TableCell data-testid="assessment-table-date">
                {formatDate(created_at)}
              </TableCell>
              <TableCell data-testid="assessment-table-type">
                {assessmentTypeNames[key]}
              </TableCell>
              <TableCell data-testid="assessment-table-company">
                {get(assessment, 'owner.user_groups[0].group.name')}
              </TableCell>
              <TableCell data-testid="assessment-table-status">
                <AssessmentStatusChip status={status} />
              </TableCell>
              <TableCell data-testid="assessment-table-report">
                <ManagementReportLink
                  assessment={assessment}
                  visible={assessment.key !== 'questionnaire'}
                  spacing={1}
                  text={t('View')}
                />
              </TableCell>
              <TableCell data-testid="assessment-table-feedback">
                <FeedbackReportLink
                  assessment={assessment}
                  visible={
                    status === 'submitted' || assessment.key === 'questionnaire'
                  }
                  spacing={1}
                  text={t('View')}
                />
              </TableCell>
              <TableCell padding="none" data-testid="assessment-table-link">
                <IconButton component={Link} to={`/assessment/${key}#${id}`}>
                  <ChevronRightIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          )
        })
      }
    />
  )
}

const styles = theme => ({
  feedbackLink: {
    display: 'flex',
    color: theme.palette.primary.dark,
    ...theme.typography.body2,
  },
  feedbackIcon: {
    color: theme.palette.secondary.main,
    marginRight: '6px',
  },
})

export default withStyles(styles)(AssessmentsTable)
