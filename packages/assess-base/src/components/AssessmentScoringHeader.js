import React, { useState } from 'react'
import T from 'prop-types'
import { useTranslation } from 'react-i18next'
import classnames from 'classnames'
import {
  withStyles,
  Button,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@material-ui/core'
import { KeyboardArrowUp } from '@material-ui/icons'

const AssessmentScoringHeader = ({ classes, isQuestionnaire = false }) => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleOpen = () => setIsOpen(!isOpen)
  const { t } = useTranslation()

  const keyColumnClassName = classnames(classes.keyColumn, {
    [classes.questionnaireScoring]: isQuestionnaire,
  })

  return (
    <>
      <Typography variant="h2" color="primary" gutterBottom>
        {t('Scoring section')}
        <Button
          color="secondary"
          className={classes.expandButton}
          onClick={toggleOpen}
        >
          {t('Scoring guide')}
          <KeyboardArrowUp
            className={classnames(classes.icon, { [classes.open]: isOpen })}
          />
        </Button>
      </Typography>
      <Table className={classnames(classes.table, { [classes.hide]: !isOpen })}>
        <TableBody>
          <TableRow>
            <TableCell className={keyColumnClassName}>0-20%</TableCell>
            <TableCell>{t('Inability to achieve')}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={keyColumnClassName}>21-40%</TableCell>
            <TableCell>{t('Limited ability to achieve')}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={keyColumnClassName}>41-60%</TableCell>
            <TableCell>{t('Ability to achieve')}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={keyColumnClassName}>61-80%</TableCell>
            <TableCell>{t('Comprehensive ability to achieve')}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={keyColumnClassName}>81-100%</TableCell>
            <TableCell>{t('Outstanding ability to achieve')}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  )
}

AssessmentScoringHeader.propTypes = {
  classes: T.object.isRequired,
  isQuestionnaire: T.bool,
}

const styles = theme => ({
  hide: {
    display: 'none',
  },
  icon: {
    color: theme.palette.secondary.main,
    transition: 'transform 0.4s',
  },
  open: {
    transform: 'rotate(180deg)',
  },
  expandButton: {
    marginLeft: theme.spacing(2),
  },
  table: {
    margin: theme.spacing(1, 0, 6),
  },
  keyColumn: {
    maxWidth: theme.spacing(8),
    fontWeight: 700,
    color: theme.palette.primary.main,
  },
  questionnaireScoring: {
    padding: 0,
  },
})

export default withStyles(styles)(AssessmentScoringHeader)
