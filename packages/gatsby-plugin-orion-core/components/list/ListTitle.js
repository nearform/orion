import React from 'react'
import T from 'prop-types'
import get from 'lodash/get'
import { makeStyles, Typography } from '@material-ui/core'

const useListTitleStyles = makeStyles(theme => ({
  title: ({ paletteColor }) => ({
    borderTopWidth: '8px',
    borderTopColor: get(theme.palette, paletteColor),
    borderTopStyle: 'solid',
    paddingTop: theme.spacing(0.5),
  }),
}))

const ListTitle = ({ paletteColor = ['primary', 'light'], title = '' }) => {
  const { title: titleStyle } = useListTitleStyles({ paletteColor })
  return (
    <Typography variant="h3" className={titleStyle}>
      {title}
    </Typography>
  )
}

ListTitle.propTypes = {
  paletteColor: T.array,
  title: T.string,
}

export default ListTitle
