import React, { useState } from 'react'
import T from 'prop-types'
import ReactMarkdown from 'react-markdown'
import classnames from 'classnames'
import { withStyles, Button, Grid, Typography } from '@material-ui/core'
import { KeyboardArrowUp } from '@material-ui/icons'

const CriterionPartHeader = ({
  classes,
  helpContent,
  title,
  buttonLabel,
  paginationNode,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleOpen = () => setIsOpen(!isOpen)

  return (
    <Grid
      container
      spacing={2}
      alignItems="baseline"
      className={classnames(className, classes.root)}
    >
      <Grid item>
        <Typography variant="h2" color="primary" gutterBottom>
          {title}
        </Typography>
      </Grid>
      {helpContent && (
        <Grid item>
          <Button color="secondary" onClick={toggleOpen}>
            {buttonLabel}
            <KeyboardArrowUp
              className={classnames(classes.icon, {
                [classes.invert]: !isOpen,
              })}
            />
          </Button>
        </Grid>
      )}
      <Grid item xs />
      {paginationNode && <Grid item>{paginationNode}</Grid>}
      {helpContent && (
        <Grid
          item
          xs={12}
          data-testid="expanding-help"
          className={classnames(classes.text, { [classes.hide]: !isOpen })}
        >
          <ReactMarkdown>{helpContent}</ReactMarkdown>
        </Grid>
      )}
    </Grid>
  )
}

CriterionPartHeader.propTypes = {
  title: T.string.isRequired,
  helpContent: T.string,
  buttonLabel: T.string,
  paginationNode: T.node,
}

const styles = theme => ({
  hide: {
    display: 'none',
  },
  icon: {
    color: theme.palette.secondary.main,
    transition: 'transform 0.4s',
  },
  invert: {
    transform: 'rotate(180deg)',
  },
  text: {},
  root: {
    // Wrestle with MUI's default .MuiGrid-spacing-xs-2 > .MuiGrid-item
    '& $text': {
      padding: theme.spacing(0, 2, 4, 2),
    },
  },
})

export default withStyles(styles)(CriterionPartHeader)
