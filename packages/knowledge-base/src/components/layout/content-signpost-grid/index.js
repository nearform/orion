import React from 'react'
import { Box, makeStyles } from '@material-ui/core'
import T from 'prop-types'

const useLinkStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex',
  },
  list: {
    display: 'grid',
    flexGrow: 1,
    gridGap: theme.spacing(4),
    gridTemplateColumns: ({ title }) =>
      `repeat(${title ? 3 : 4} , minmax(0, 1fr))`,
    listStyle: 'none',
    margin: 0,
    padding: 0,
    width: '100%',
  },
  titleBox: {
    flex: '0 0 20%',
    marginBottom: 0,
    marginRight: theme.spacing(2),
    marginTop: 0,
  },
}))

const ContentSignpostGrid = ({ children = [], title }) => {
  const { list, titleBox, wrapper } = useLinkStyles({ title })

  return (
    <Box className={wrapper} component="section">
      {title && (
        <Box className={titleBox} data-test-id="title">
          {title}
        </Box>
      )}
      <Box className={list} component="ul" data-test-id="list">
        {children.map((child, index) => (
          <li key={index}>{child}</li>
        ))}
      </Box>
    </Box>
  )
}

ContentSignpostGrid.propTypes = {
  children: T.array,
  title: T.node,
}

export default ContentSignpostGrid
