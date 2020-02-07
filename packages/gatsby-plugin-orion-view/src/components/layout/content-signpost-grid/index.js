import React from 'react'
import { Box, useMediaQuery, makeStyles } from '@material-ui/core'
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
    [theme.breakpoints.down('xs')]: {
      gridGap: theme.spacing(2),
      gridTemplateColumns: () => 'repeat(1 , minmax(0, 1fr))',
    },
  },
  titleBox: {
    flex: '0 0 20%',
    marginBottom: 0,
    marginRight: theme.spacing(2),
    marginTop: 0,
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(3),
      width: '100%',
    },
  },
}))

const ContentSignpostGrid = ({ children = [], title = null }) => {
  const { list, titleBox, wrapper } = useLinkStyles({ title })
  const isMobile = useMediaQuery('(max-width: 800px)')

  // TODO: use a real key for the index... this is bad!
  /* eslint-disable react/no-array-index-key */
  const content = (
    <>
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
    </>
  )
  /* eslint-enable react/no-array-index-key */

  return isMobile ? (
    <div>{content}</div>
  ) : (
    <Box className={wrapper} component="section">
      {content}
    </Box>
  )
}

ContentSignpostGrid.propTypes = {
  children: T.array,
  title: T.node,
}

export default ContentSignpostGrid