import React from 'react'
import { TableRow, TableCell, IconButton } from '@material-ui/core'
import { Link, useStaticQuery, graphql } from 'gatsby'
import ChevronRightIcon from '@material-ui/icons/ChevronRightRounded'
import { useTranslation } from 'react-i18next'
import keyBy from 'lodash/keyBy'
import get from 'lodash/get'

import { AssessmentStatusChip } from 'components'
import { getAssessmentsData } from '../queries'
import { formatDate } from '../utils/date'
import QueryTable from './QueryTable'

function AssessmentsTable() {
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
    { id: 'created_at', label: 'Created At', sortable: true },
    { id: 'assessmentType', label: 'Assessment Type' },
    { id: 'company', label: 'Company' },
    { id: 'status', label: 'Status', sortable: true },
    { id: 'managementReport', label: 'Management Report' },
    { id: 'feeback', label: 'Feedback' },
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
              {assessmentKeyToName[assessment.key].tableName}
            </TableCell>
            <TableCell>
              {get(assessment, 'owner.user_groups[0].group.name')}
            </TableCell>
            <TableCell>
              <AssessmentStatusChip status={assessment.status} />
            </TableCell>
            <TableCell />
            <TableCell />
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

export default AssessmentsTable
