import React from 'react'
import PropTypes from 'prop-types'
import 'date-fns' // eslint-disable-line import/no-unassigned-import
import { Button, Grid, makeStyles } from '@material-ui/core'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import PathEditor from '../PathEditor'
import ArticleDatePicker from '../ArticleDatePicker'

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
  'dialog-wrapper': {
    '& .MuiButton-root': {
      minWidth: 'auto',
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
  ancestry,
  setPath,
  path,
}) => {
  const classes = useStyles()

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <PathEditor ancestry={ancestry} setPath={setPath} path={path} />
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
            <ArticleDatePicker
              showTodayButton
              dialogPropsClassName={classes['dialog-wrapper']}
              value={publishedDate}
              id="published-date-picker"
              maxDate={expiresDate}
              emptyLabel="Now"
              InputProps={{ className: classes['published-date-input'] }}
              onChange={dateTime => setPublishedDate(dateTime)}
            />
          </Button>
        </Grid>
        <Grid item>
          <ArticleDatePicker
            clearable
            id="expires-date-picker"
            minDate={publishedDate}
            classes={{
              root: classes['expires-date-root'],
            }}
            dialogPropsClassName={classes['dialog-wrapper']}
            format="MMM dd yyyy"
            value={expiresDate}
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
  isEditing: PropTypes.bool.isRequired,
  onEdit: PropTypes.func.isRequired,
  onPreview: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onSettings: PropTypes.func.isRequired,
  setPublishedDate: PropTypes.func.isRequired,
  publishedDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
  ]),
  setExpiresDate: PropTypes.func.isRequired,
  expiresDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
  ]),
  ancestry: PropTypes.arrayOf(
    PropTypes.shape({
      ancestor: PropTypes.shape({
        path: PropTypes.string.isRequired,
      }),
    })
  ).isRequired,
  path: PropTypes.string,
  setPath: PropTypes.func.isRequired,
}

ArticleEditButtons.defaultProps = {
  publishedDate: null,
  expiresDate: null,
  path: '',
}

export default ArticleEditButtons
