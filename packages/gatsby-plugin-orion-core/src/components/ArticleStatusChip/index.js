import React from 'react'
import { Chip, makeStyles } from '@material-ui/core'
import T from 'prop-types'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'
import { fade } from '@material-ui/core/styles/colorManipulator'
import { colorDefinitions } from 'gatsby-theme-acme/variables'

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

const useStyles = makeStyles(() => {
  const articleColors = {
    inProgress: {
      labelColor: colorDefinitions.slateGrey,
      chipColor: fade(colorDefinitions.cyan, 0.1),
      iconColor: colorDefinitions.cyan,
    },
    inReview: {
      labelColor: colorDefinitions.slateGrey,
      chipColor: fade(colorDefinitions.yellow, 0.2),
      iconColor: colorDefinitions.slateGrey,
    },
    published: {
      labelColor: colorDefinitions.white,
      chipColor: colorDefinitions.navyBlue,
      iconColor: colorDefinitions.white,
    },
    hidden: {
      labelColor: colorDefinitions.slateGrey,
      chipColor: fade(colorDefinitions.lightGrey, 0.07),
      iconColor: colorDefinitions.lightGrey,
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
})

function ArticleStatusChip({ status }) {
  const classes = useStyles()
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
}

export default ArticleStatusChip
