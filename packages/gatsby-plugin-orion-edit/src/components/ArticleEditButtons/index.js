import React from 'react'
import T from 'prop-types'
import 'date-fns' // eslint-disable-line import/no-unassigned-import
import { Button, Grid, makeStyles } from '@material-ui/core'
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

const useStyles = makeStyles(theme => ({
  'published-date-input': {
    background: 'none',
    border: 'none',
    color: theme.palette.common.white,
    fontWeight: 700,
    fontSize: '16px',
    cursor: 'pointer',
    padding: 0,

    '& input': {
      cursor: 'pointer',
      padding: '5px 5px 6px',
      textAlign: 'center',
    },
  },
  publishButton: {
    borderRadius: '4px 0 0 4px',
    boxShadow: 'none',
    borderRight: '1px solid white',
  },
  dateButton: {
    borderRadius: '0 4px 4px 0',
    boxShadow: 'none',
    padding: 0,
  },
  'expires-date-root': {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  'expires-date-input': {
    background: 'none',
    border: 'none',
    borderBottom: `1px solid ${theme.palette.common.white}`,
    color: theme.palette.common.white,
    fontWeight: 700,
    fontSize: '16px',
    cursor: 'pointer',
    padding: 0,
    margin: '0 !important',

    '& input': {
      cursor: 'pointer',
      padding: '5px 5px 6px',
    },
  },
  'expires-date-label': {
    color: theme.palette.common.white,
    transform: 'none',
    position: 'static',

    '&.Mui-focused': {
      color: theme.palette.common.white,
    },
  },
}))

const ArticleEditButtons = ({
  isEditing,
  onEdit,
  onPreview,
  onSave,
  onSettings,
  publishedDate,
  setPublishedDate,
  expiresDate,
  setExpiresDate,
}) => {
  const classes = useStyles()

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container spacing={2}>
        <Grid item>
          <Button variant="contained" color="secondary" onClick={onSettings}>
            Page settings
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => (isEditing ? onPreview() : onEdit())}
          >
            {isEditing ? 'Preview' : 'Edit'}
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            className={classes.publishButton}
            onClick={onSave}
          >
            Publish
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.dateButton}
          >
            <DateTimePicker
              autoOk
              ampm={false}
              format="MMM dd yyyy, hh:mm a"
              variant="inline"
              value={publishedDate}
              id="published-date-picker"
              maxDate={expiresDate}
              orientation="portrait"
              emptyLabel="Now"
              InputProps={{ className: classes['published-date-input'] }}
              onChange={dateTime => setPublishedDate(dateTime)}
            />
          </Button>
        </Grid>
        <Grid item>
          <DateTimePicker
            autoOk
            ampm={false}
            id="expires-date-picker"
            minDate={publishedDate}
            classes={{
              root: classes['expires-date-root'],
            }}
            format="MMM dd yyyy"
            variant="inline"
            value={expiresDate}
            orientation="portrait"
            emptyLabel="Never"
            InputProps={{ className: classes['expires-date-input'] }}
            label="Expires:"
            InputLabelProps={{
              className: classes['expires-date-label'],
            }}
            onChange={dateTime => setExpiresDate(dateTime)}
          />
        </Grid>
      </Grid>
    </MuiPickersUtilsProvider>
  )
}

ArticleEditButtons.propTypes = {
  isEditing: T.bool.isRequired,
  onEdit: T.func.isRequired,
  onPreview: T.func.isRequired,
  onSave: T.func.isRequired,
  onSettings: T.func.isRequired,
  setPublishedDate: T.func.isRequired,
  publishedDate: T.oneOfType([T.string, T.instanceOf(Date)]),
  setExpiresDate: T.func.isRequired,
  expiresDate: T.oneOfType([T.string, T.instanceOf(Date)]),
}

ArticleEditButtons.defaultProps = {
  publishedDate: null,
  expiresDate: null,
}

export default ArticleEditButtons
