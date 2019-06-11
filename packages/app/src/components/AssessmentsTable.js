import React from 'react'
import MuiTableRow from '@material-ui/core/TableRow'
import MuiTableCell from '@material-ui/core/TableCell'
import IconButton from '@material-ui/core/IconButton'
import { Link, useStaticQuery, graphql } from 'gatsby'
import FileCopyIcon from '@material-ui/icons/FileCopy'
import ChevronRightIcon from '@material-ui/icons/ChevronRightRounded'
import { useTranslation } from 'react-i18next'
import keyBy from 'lodash/keyBy'
import get from 'lodash/get'

import { AssessmentStatusChip } from 'components'
import { getAssessmentsData } from '../queries'
import { formatDate } from '../utils/date'
import Table from './Table'

function AssessmentsTable() {
  const { t } = useTranslation()

  const { allAssessments } = useStaticQuery(
    graphql`
      query {
        allAssessments {
          nodes {
            key
            name
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
    { id: 'copy', label: 'Copy' },
    { id: 'link', label: '' },
  ]

  const assessmentKeyToName = keyBy(allAssessments.nodes, 'key')

  return (
    <Table
      testid="assessments-table"
      headers={headers}
      query={getAssessmentsData}
      orderBy={{ created_at: 'desc' }}
      renderTableBody={data =>
        data.assessment.map((assessment, index) => (
          <MuiTableRow hover key={index}>
            <MuiTableCell>{assessment.name}</MuiTableCell>
            <MuiTableCell>{formatDate(assessment.created_at)}</MuiTableCell>
            <MuiTableCell>
              {assessmentKeyToName[assessment.key].name}
            </MuiTableCell>
            <MuiTableCell>
              {get(assessment, 'owner.user_groups[0].group.name')}
            </MuiTableCell>
            <MuiTableCell>
              <AssessmentStatusChip status={assessment.status} />
            </MuiTableCell>
            <MuiTableCell />
            <MuiTableCell />
            <MuiTableCell>
              <IconButton>
                <FileCopyIcon />
              </IconButton>
            </MuiTableCell>
            <MuiTableCell>
              <IconButton
                component={Link}
                to={`/assessment/${assessment.key}#${assessment.id}`}
              >
                <ChevronRightIcon />
              </IconButton>
            </MuiTableCell>
          </MuiTableRow>
        ))
      }
    />
  )
}

export default AssessmentsTable
