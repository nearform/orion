import React from 'react'
import T from 'prop-types'
import PaddedContainer from 'gatsby-plugin-orion-core/src/components/PaddedContainer'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4, 0),
  },
}))

function SectionLayout({ main }) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <PaddedContainer>{main}</PaddedContainer>
    </div>
  )
}

SectionLayout.propTypes = {
  main: T.node.isRequired,
}

export default SectionLayout
