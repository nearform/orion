import React from 'react'
import PaddedContainer from 'gatsby-plugin-orion-core/src/components/PaddedContainer'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  '@keyframes fadeIn': {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  '@keyframes loadingBar': {
    '0%': { boxShadow: '0 0 0 0 inset white, 0 0 0 0 inset black' },
    '50%': { boxShadow: '0 0 0 0 inset white, 95px 0 0 0 inset black' },
    '100%': { boxShadow: '96px 0 0 0 inset white, 95px 0 0 0 inset black' },
  },
  title: {
    opacity: 0,
    animation: '$fadeIn 300ms linear 200ms',
    animationFillMode: 'forwards',
  },
  loader: {
    opacity: 0,
    animation:
      '$loadingBar 3000ms linear infinite 200ms, $fadeIn 300ms linear 200ms forwards',
    height: 1,
  },
}))

const PageLoading = () => {
  const classes = useStyles()

  return (
    <PaddedContainer>
      <h1 className={classes.title}>Loading</h1>
      <div className={classes.loader} />
    </PaddedContainer>
  )
}

export default PageLoading
