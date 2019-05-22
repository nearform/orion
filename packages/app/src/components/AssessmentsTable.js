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

import { AssessmentStatusChip, ASSESSMENT_STATUS } from 'components'
import { getAssessmentsData } from '../queries'
import { getUserIdSync } from '../utils/auth'
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

  const { data: assessmentsData, loading, error } = useQuery(
    getAssessmentsData,
    {
      variables: {
        userId: getUserIdSync(),
      },
    }
  )

  if (loading) return <Typography>Loading...</Typography>
  if (error) return <Typography>Error loading assessments.</Typography>

  const assessmentKeyToName = keyBy(allAssessments.nodes, 'key')

  return (
    <Table padding="dense">
      <TableHead>
        <TableRow>
          <TableCell>{t('Your assessments')}</TableCell>
          <TableCell>Created</TableCell>
          <TableCell>Assessment Type</TableCell>
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
              <AssessmentStatusChip status={ASSESSMENT_STATUS.inProgress} />
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
