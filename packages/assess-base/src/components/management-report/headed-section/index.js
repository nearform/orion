import React from 'react'
import { Box, withStyles } from '@material-ui/core'
import T from 'prop-types'

import Heading from '../heading'

function HeadedSection({ children, classes, pillar, title }) {
  return (
    <Box className={classes.layoutWrapper} component="section">
      <Box className={classes.layoutHeading}>
        <div
          className={[classes[`${pillar}Pillar`], classes.pillarBar].join(' ')}
        />
        <Heading className={classes.headingClass}>{title}</Heading>
      </Box>
      <Box className={classes.layoutDetails}>{children}</Box>
    </Box>
  )
}

HeadedSection.propTypes = {
  children: T.any,
  classes: T.object.isRequired,
}

const styles = theme => ({
  layoutWrapper: {
    display: 'flex',
    marginBottom: theme.spacing(4),
    '&:last-of-type': {
      marginBottom: 0,
    },
  },
  layoutHeading: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    marginRight: theme.spacing(2),
    paddingTop: theme.spacing(0.5),
  },
  layoutDetails: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: '70%',
  },
  pillarBar: {
    display: 'block',
    height: '8px',
    marginBottom: theme.spacing(0.5),
  },
  defaultPillar: {
    backgroundColor: theme.palette.grey[500],
  },
  directionPillar: {
    backgroundColor: theme.taxonomyColor.C3,
  },
  executionPillar: {
    backgroundColor: theme.taxonomyColor.C2,
  },
  resultsPillar: {
    backgroundColor: theme.taxonomyColor.C4,
  },
})

export default withStyles(styles)(HeadedSection)
