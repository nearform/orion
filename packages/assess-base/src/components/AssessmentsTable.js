import React from 'react'
import { withStyles, TableRow, TableCell, IconButton } from '@material-ui/core'
import { Link, useStaticQuery, graphql } from 'gatsby'
import ChevronRightIcon from '@material-ui/icons/ChevronRightRounded'
import { useTranslation } from 'react-i18next'
import keyBy from 'lodash/keyBy'
import get from 'lodash/get'

import { AssessmentStatusChip } from 'components'
import { getAssessmentsData } from '../queries'
import { formatDate } from '../utils/date'
import QueryTable from './QueryTable'
import { FeedbackReportLink, ManagementReportLink } from './report-links'

function AssessmentsTable({ classes }) {
  const { t } = useTranslation()

  const { allAssessments } = useStaticQuery(
    graphql`
      query {
        allAssessments {
          nodes {
            key
            tableName
          }
        }
      }
    `
  )

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

  const assessmentKeyToName = keyBy(allAssessments.nodes, 'key')

  return (
    <QueryTable
      testid="assessments-table"
      headers={headers}
      query={getAssessmentsData}
      orderBy={{ created_at: 'desc' }}
      renderTableBody={data =>
        data &&
        data.assessment.map((assessment, index) => (
          <TableRow hover key={index} size="small">
            <TableCell>{assessment.name}</TableCell>
            <TableCell>{formatDate(assessment.created_at)}</TableCell>
            <TableCell>
              {t(assessmentKeyToName[assessment.key].tableName)}
            </TableCell>
            <TableCell>
              {get(assessment, 'owner.user_groups[0].group.name')}
            </TableCell>
            <TableCell>
              <AssessmentStatusChip status={assessment.status} />
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
                visible={assessment.status === 'submitted'}
                spacing={1}
                text={t('View')}
              />
            </TableCell>
            <TableCell padding="none">
              <IconButton
                component={Link}
                to={`/assessment/${assessment.key}#${assessment.id}`}
              >
                <ChevronRightIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))
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
