import React from 'react'
import { Chip, withStyles, Typography } from '@material-ui/core'
import T from 'prop-types'

import EditIcon from '@material-ui/icons/Edit'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import DoneIcon from '@material-ui/icons/Done'

import { theme } from '../../../theme.es'

export const articleStatusMap = {
  'in-progress': {
    label: 'In Progress',
    Icon: MoreHorizIcon,
  },
  'in-review': {
    label: 'Needs Review',
    Icon: EditIcon,
  },
  published: {
    label: 'Published',
    Icon: DoneIcon,
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
    status: {
      textTransform: 'none',
      // color: theme.palette.primary.dark,
      // padding: theme.spacing(0.5, 0),
    },
  }
}

export default withStyles(styles)(ArticleStatusChip)
