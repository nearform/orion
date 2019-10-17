import React, { useState } from 'react'
import T from 'prop-types'
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

const AssessmentScoringHeader = ({ classes }) => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleOpen = () => setIsOpen(!isOpen)

  return (
    <>
      <Typography variant="h2" color="primary" gutterBottom>
        Scoring section
        <Button
          color="secondary"
          className={classes.expandButton}
          onClick={toggleOpen}
        >
          Scoring guide
          <KeyboardArrowUp
            className={classnames(classes.icon, { [classes.open]: isOpen })}
          />
        </Button>
      </Typography>
      <Table className={classnames(classes.table, { [classes.hide]: !isOpen })}>
        <TableBody>
          <TableRow>
            <TableCell className={classes.keyColumn}>0-20%</TableCell>
            <TableCell>Inability to achieve</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.keyColumn}>21-40%</TableCell>
            <TableCell>Limited ability to achieve</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.keyColumn}>41-60%</TableCell>
            <TableCell>Ability to achieve</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.keyColumn}>61-80%</TableCell>
            <TableCell>Comprehensive ability to achieve</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.keyColumn}>81-100%</TableCell>
            <TableCell>Outstanding ability to achieve</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  )
}

AssessmentScoringHeader.propTypes = {
  classes: T.object.isRequired,
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
})

export default withStyles(styles)(AssessmentScoringHeader)
