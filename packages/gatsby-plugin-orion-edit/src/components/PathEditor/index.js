import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core'
import getParentPath from '../../utils/get-parent-path'

const useStyles = makeStyles(theme => ({
  path: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'flex-start',
    whiteSpace: 'nowrap',
    marginRight: '16px',
    fontFamily: theme.typography.fontFamily,

    '& label': {
      color: theme.palette.common.white,
      fontSize: '16px',
      marginRight: '8px',
      whiteSpace: 'nowrap',
      fontWeight: '700',
    },

    '& span': {
      color: theme.palette.common.white,
      fontSize: '16px',
      whiteSpace: 'nowrap',
    },
    '& input': {
      fontFamily: theme.typography.fontFamily,
      marginLeft: '4px',
      color: theme.palette.common.black,
      fontSize: '16px',
      borderRadius: '3px',
      border: 'none',
      padding: '3.5px 4px 2px',

      '&:focus': {
        outlineColor: theme.palette.action.main,
      },
    },
  },
}))

const PathEditor = ({ ancestry, setPath, path }) => {
  const classes = useStyles()

  const parentPath = useMemo(() => {
    return getParentPath(ancestry)
  }, [ancestry])

  return (
    <div className={classes.path}>
      <label htmlFor="edit-path-path-input">Path:</label>
      <span>{parentPath}</span>
      <span>/</span>
      <input
        value={path}
        id="edit-path-path-input"
        onChange={({ target }) => setPath(target.value)}
      />
    </div>
  )
}

PathEditor.propTypes = {
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

PathEditor.defaultProps = {
  path: '',
}

export default PathEditor
