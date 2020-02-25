import React from 'react'
import { Chip, withStyles } from '@material-ui/core'
import T from 'prop-types'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'

export const articleStatusMap = {
  'in-progress': {
    label: 'In Progress',
  },
  'in-review': {
    label: 'Needs Review',
  },
  published: {
    label: 'Published',
  },
  hidden: {
    label: 'Hidden',
    Icon: VisibilityOffIcon,
  },
}

function ArticleStatusChip({ status, classes }) {
  const { label, Icon } = articleStatusMap[status]

  return (
    <Chip
      size="small"
      classes={classes}
      label={label}
      icon={Icon && <Icon />}
      clickable={false}
    />
  )
}

ArticleStatusChip.propTypes = {
  status: T.oneOf(Object.keys(articleStatusMap)).isRequired,
  classes: T.object,
}

const styles = theme => {
  const articleColors = {
    'in-progress': {
      ...(theme.articleStatusChip && theme.articleStatusChip.inProgress
        ? theme.articleStatusChip.inProgress
        : {}),
    },
    'in-review': {
      ...(theme.articleStatusChip && theme.articleStatusChip.inReview
        ? theme.articleStatusChip.inReview
        : {}),
    },
    published: {
      ...(theme.articleStatusChip && theme.articleStatusChip.published
        ? theme.articleStatusChip.published
        : {}),
    },
    hidden: {
      ...(theme.articleStatusChip && theme.articleStatusChip.hidden
        ? theme.articleStatusChip.hidden
        : {}),
    },
  }
  return {
    root: {
      backgroundColor: props => articleColors[props.status].chipColor,
    },
    label: {
      color: props => articleColors[props.status].labelColor,
    },
    icon: {
      color: props => articleColors[props.status].iconColor,
    },
  }
}

export default withStyles(styles)(ArticleStatusChip)
