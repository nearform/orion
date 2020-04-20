import React from 'react'
import T from 'prop-types'
import 'date-fns' // eslint-disable-line import/no-unassigned-import
import { Button, Grid, makeStyles } from '@material-ui/core'
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

const useStyles = makeStyles(theme => ({
  input: {
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
}))

const ArticleEditButtons = ({
  isEditing,
  onEdit,
  onPreview,
  onSaveDraft,
  onPublish,
  onSettings,
  publishedDate,
  setPublishedDate,
}) => {
  const classes = useStyles()

  return (
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
      {publishedDate === null && (
        <Grid item>
          <Button variant="contained" color="secondary" onClick={onSaveDraft}>
            Save Draft
          </Button>
        </Grid>
      )}
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          className={classes.publishButton}
          onClick={onPublish}
        >
          Publish
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={classes.dateButton}
        >
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateTimePicker
              autoOk
              ampm={false}
              format="MMM dd yyyy, hh:mm a"
              variant="inline"
              value={publishedDate}
              mask="now"
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
              orientation="portrait"
              emptyLabel="Now"
              InputProps={{ className: classes.input }}
              onChange={dateTime => setPublishedDate(dateTime)}
            />
          </MuiPickersUtilsProvider>
        </Button>
      </Grid>
    </Grid>
  )
}

ArticleEditButtons.propTypes = {
  isEditing: T.bool.isRequired,
  onEdit: T.func.isRequired,
  onPreview: T.func.isRequired,
  onSaveDraft: T.func.isRequired,
  onPublish: T.func.isRequired,
  onSettings: T.func.isRequired,
  setPublishedDate: T.func.isRequired,
  publishedDate: T.oneOfType([T.string, T.instanceOf(Date)]),
}

ArticleEditButtons.defaultProps = {
  publishedDate: null,
}

export default ArticleEditButtons
