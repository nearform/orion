import React from 'react'
import { Box, withStyles } from '@material-ui/core'
import T from 'prop-types'

import rowPadding from '../row-padding'

const AnswerSection = ({ answer, classes, key, prefix, title }) => {
  return (
    <Box
      className={classes.answerSectionWrapper}
      component="div"
      key={`${prefix}-${key}`}
    >
      <span className={classes.prefix}>{prefix}</span>
      <span className={classes.title}>{title}</span>
      <span className={classes.body}>{answer}</span>
    </Box>
  )
}

AnswerSection.propTypes = {
  answer: T.string, // Answer text
  classes: T.object, // MUI
  key: T.string, // Key for React
  prefix: T.string, // Prefix to title
  title: T.string, // Title for the answer section
}

const styles = theme => ({
  answerSectionWrapper: {
    display: 'flex',
    borderBottom: `1px solid ${theme.palette.grey[100]}`,
    paddingBottom: theme.spacing(rowPadding.paddingBottom),
    paddingTop: theme.spacing(rowPadding.paddingTop),
    '&:last-of-type': {
      borderBottom: 'none',
    },
  },
  prefix: {
    flexBasis: '4%',
    paddingLeft: theme.spacing(4),
  },
  title: {
    flexBasis: '26%',
    flexGrow: 1,
    fontSize: '12px',
    fontWeight: '700',
    paddingLeft: theme.spacing(rowPadding.paddingLeft),
    paddingRight: theme.spacing(2),
    paddingTop: '1px',
    textTransform: 'uppercase',
  },
  body: {
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: '70%',
    paddingRight: theme.spacing(rowPadding.paddingRight),
    whiteSpace: 'pre-wrap',
  },
})

export default withStyles(styles)(AnswerSection)
