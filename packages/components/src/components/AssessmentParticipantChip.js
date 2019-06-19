import React from 'react'
import T from 'prop-types'
import { withStyles, Chip, Typography } from '@material-ui/core'
import { fade } from '@material-ui/core/styles/colorManipulator'
import ClearIcon from '@material-ui/icons/Clear'

export const PARTICIPANT_TYPE = {
  assessor: 'Assessor',
  contributor: 'Contributor',
}

function AssessmentParticipantChip({ type, name, onDelete, classes }) {
  return (
    <Chip
      onDelete={onDelete}
      deleteIcon={<ClearIcon fontSize="small" />}
      classes={classes}
      clickable={false}
      label={
        <>
          <Typography className={'name'}>{name}</Typography>
          <Typography variant="h4" className={type}>
            {PARTICIPANT_TYPE[type]}
          </Typography>
        </>
      }
    />
  )
}

AssessmentParticipantChip.propTypes = {
  name: T.string.isRequired,
  classes: T.object,
  type: T.oneOf(Object.keys(PARTICIPANT_TYPE)).isRequired,
  onDelete: T.func,
}

const styles = theme => ({
  root: {
    height: '40px',
    borderRadius: '20px',
    backgroundColor: theme.palette.background.light,
    color: theme.palette.text.primary,
  },
  colorPrimary: {
    backgroundColor: fade(theme.palette.primary.light, 0.1),
  },
  deleteIcon: {
    width: '16px',
  },
  deletable: {
    '&:focus': {
      backgroundColor: theme.palette.background.light,
    },
  },
  label: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    paddingRight: theme.spacing(2),
    '& > * ': {
      marginLeft: theme.spacing(1),
    },
    '& > .assessor': {
      color: theme.palette.primary.main,
    },
    '& > .contributor': {
      color: theme.palette.primary.light,
    },
    '& > .contributor, & > .assessor': {
      fontSize: '10px',
      fontWeight: 'bold',
    },
    '& > .name': {
      textTransform: 'none',
      color: theme.palette.primary.dark,
      fontSize: '14px',
      fontWeight: 'bold',
    },
  },
})

export default withStyles(styles, { withTheme: true })(
  AssessmentParticipantChip
)
