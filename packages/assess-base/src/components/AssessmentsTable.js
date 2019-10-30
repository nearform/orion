import React from 'react'
import { withStyles, TableRow, TableCell, IconButton } from '@material-ui/core'
import { Link } from 'gatsby'
import ChevronRightIcon from '@material-ui/icons/ChevronRightRounded'
import { useTranslation } from 'react-i18next'
import keyBy from 'lodash/keyBy'
import get from 'lodash/get'

import { AssessmentStatusChip } from 'components'
import { getAssessmentsData } from '../queries'
import { formatDate } from '../utils/date'
import QueryTable from './QueryTable'
import { FeedbackReportLink, ManagementReportLink } from './report-links'
import { getAssessmentTypes } from 'efqm-theme/assessments/getAssessmentParts'

function AssessmentsTable({ classes }) {
  const { t, i18n } = useTranslation()
  const l = i18n.language
  const assessmentTypes = getAssessmentTypes(l)

  const headers = [
    { id: 'id', label: t('Your assessments'), sortable: true },
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

  const assessmentKeyToName = keyBy(assessmentTypes, 'key')

  return (
    <QueryTable
      testid="assessments-table"
      headers={headers}
      query={getAssessmentsData}
      orderBy={{ created_at: 'desc' }}
      renderTableBody={data =>
        data.assessment.map((assessment, index) => {
          const { id, key, name: title, created_at, status } = assessment
          const { [key]: { name = '' } = {} } = assessmentKeyToName
          return (
            <TableRow hover key={index} size="small">
              <TableCell>{title}</TableCell>
              <TableCell>{formatDate(created_at)}</TableCell>
              <TableCell>{t(name)}</TableCell>
              <TableCell>
                {get(assessment, 'owner.user_groups[0].group.name')}
              </TableCell>
              <TableCell>
                <AssessmentStatusChip status={status} />
              </TableCell>
              <TableCell>
                <ManagementReportLink
                  assessment={assessment}
                  spacing={1}
                  text={t('View')}
                />
              </TableCell>
              <TableCell>
                <FeedbackReportLink
                  assessment={assessment}
                  visible={status === 'submitted'}
                  spacing={1}
                  text={t('View')}
                />
              </TableCell>
              <TableCell padding="none">
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
