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
      labelColor: theme.articleStatusLabelColor.inProgress,
      chipColor: theme.articleStatusColor.inProgress,
      iconColor: theme.articleStatusIconColor.inProgress,
    },
    'in-review': {
      labelColor: theme.articleStatusLabelColor.inReview,
      chipColor: theme.articleStatusColor.inReview,
      iconColor: theme.articleStatusIconColor.inReview,
    },
    published: {
      labelColor: theme.articleStatusLabelColor.published,
      chipColor: theme.articleStatusColor.published,
      iconColor: theme.articleStatusIconColor.published,
    },
    hidden: {
      labelColor: theme.articleStatusLabelColor.hidden,
      chipColor: theme.articleStatusColor.hidden,
      iconColor: theme.articleStatusIconColor.hidden,
    },
  }
  return {
    root: {
      backgroundColor: props => articleColors[props.status].chipColor,
    },
    sizeSmall: {
      height: '18px',
    },
    label: {
      color: props => articleColors[props.status].labelColor,
      fontFamily: theme.fontFamily,
      fontSize: '11px',
      fontWeight: 700,
      letterSpacing: '1.2px',
      lineHeight: '13px',
    },
    icon: {
      color: props => articleColors[props.status].iconColor,
      fontSize: 'inherit',
      order: 1,
      marginLeft: '-5px',
      marginRight: '5px',
    },
  }
}

export default withStyles(styles)(ArticleStatusChip)
