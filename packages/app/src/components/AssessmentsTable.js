import React from 'react'
import {
  TableHead,
  TableRow,
  TableCell,
  Table,
  TableBody,
  IconButton,
  Typography,
} from '@material-ui/core'
import { Link, useStaticQuery, graphql } from 'gatsby'
import FileCopyIcon from '@material-ui/icons/FileCopy'
import ChevronRightIcon from '@material-ui/icons/ChevronRightRounded'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'graphql-hooks'
import keyBy from 'lodash/keyBy'
import get from 'lodash/get'

import { AssessmentStatusChip } from 'components'
import { getAssessmentsData } from '../queries'
import { formatDate } from '../utils/date'

export default function AssessmentsTable() {
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

  const { data: assessmentsData, loading, error } = useQuery(getAssessmentsData)

  if (loading) return <Typography>Loading...</Typography>
  if (error) return <Typography>Error loading assessments.</Typography>

  const assessmentKeyToName = keyBy(allAssessments.nodes, 'key')

  return (
    <Table size="small" data-testid="assessments-table">
      <TableHead>
        <TableRow>
          <TableCell>{t('Your assessments')}</TableCell>
          <TableCell>Created</TableCell>
          <TableCell>Assessment Type</TableCell>
          <TableCell>Company</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Management Report</TableCell>
          <TableCell>Report</TableCell>
          <TableCell>Copy</TableCell>
          <TableCell />
        </TableRow>
      </TableHead>
      <TableBody>
        {assessmentsData.assessment.map(assessment => (
          <TableRow hover key={assessment.id}>
            <TableCell>{assessment.name}</TableCell>
            <TableCell>{formatDate(assessment.created_at)}</TableCell>
            <TableCell>{assessmentKeyToName[assessment.key].name}</TableCell>
            <TableCell>
              {get(assessment, 'owner.user_groups[0].group.name')}
            </TableCell>
            <TableCell>
              <AssessmentStatusChip status={assessment.status} />
            </TableCell>
            <TableCell />
            <TableCell />
            <TableCell>
              <IconButton>
                <FileCopyIcon />
              </IconButton>
            </TableCell>
            <TableCell>
              <IconButton
                component={Link}
                to={`/assessment/${assessment.key}#${assessment.id}`}
              >
                <ChevronRightIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
