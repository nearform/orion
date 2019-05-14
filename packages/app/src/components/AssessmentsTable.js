import React from 'react'
import {
  TableHead,
  TableRow,
  TableCell,
  Table,
  TableBody,
  IconButton,
} from '@material-ui/core'
import FileCopyIcon from '@material-ui/icons/FileCopy'
import ChevronRightIcon from '@material-ui/icons/ChevronRightRounded'
import { useTranslation } from 'react-i18next'
import { AssessmentStatusChip, ASSESSMENT_STATUS } from 'components'

function AssessmentsTable() {
  const mockAssessments = [
    {
      name: 'Q1 Questionnaire Assessment for Company A',
      type: 'Questionaire',
      updated_at: new Date().toLocaleDateString(),
      status: ASSESSMENT_STATUS.inProgress,
    },
    {
      name: 'Another Questionnaire Assessment for Company A',
      type: 'Questionaire',
      updated_at: new Date().toLocaleDateString(),
      status: ASSESSMENT_STATUS.submitted,
    },
    {
      name: 'Business Matrix Assessment for Company B',
      type: 'Business Matrix',
      updated_at: new Date().toLocaleDateString(),
      status: ASSESSMENT_STATUS.closed,
    },
  ]

  const { t } = useTranslation()

  return (
    <Table padding="dense">
      <TableHead>
        <TableRow>
          <TableCell>{t('Your assessments')}</TableCell>
          <TableCell>Last Updated</TableCell>
          <TableCell>Assessment Type</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Management Report</TableCell>
          <TableCell>Report</TableCell>
          <TableCell>Copy</TableCell>
          <TableCell />
        </TableRow>
      </TableHead>
      <TableBody>
        {mockAssessments.map(assessment => (
          <TableRow
            hover
            key={assessment.name}
            // eslint-disable-next-line no-console
            onClick={event => console.log('Go to assessment action', event)}
          >
            <TableCell>{assessment.name}</TableCell>
            <TableCell>{assessment.updated_at}</TableCell>
            <TableCell>{assessment.type}</TableCell>
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
              <IconButton>
                <ChevronRightIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default AssessmentsTable
