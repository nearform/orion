import React, { useState } from 'react'
import T from 'prop-types'
import classnames from 'classnames'
import { useMutation } from 'graphql-hooks'
import get from 'lodash/get'
import { withStyles, Button, CircularProgress } from '@material-ui/core'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'
import VisibilityIcon from '@material-ui/icons/Visibility'

import { updateArticleMutation } from '../../queries'

const HideButton = ({ classes, articleId, status, refetchArticle }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [updateArticle] = useMutation(updateArticleMutation)

  const isHidden = status === 'hidden'
  const actionVerb = isHidden ? 'Republish' : 'Hide'
  const ActionIcon = isHidden ? VisibilityIcon : VisibilityOffIcon

  const onClick = async () => {
    setIsLoading(true)

    // Only published articles may be hidden
    const newStatus = isHidden ? 'published' : 'hidden'
    const result = await updateArticle({
      variables: {
        id: articleId,
        changes: {
          status: newStatus,
        },
      },
    })

    const savedStatus = get(result, 'data.update_article.returning[0].status')
    if (savedStatus !== status) refetchArticle(true)
    setIsLoading(false)
  }

  return (
    <Button onClick={onClick} className={classes.root}>
      {isLoading ? (
        <CircularProgress
          color="secondary"
          size={24}
          className={classnames(classes.icon, classes.secondary)}
        />
      ) : (
        <ActionIcon
          className={classnames(classes.icon, {
            [classes.secondary]: isHidden,
          })}
        />
      )}
      {actionVerb} this article
    </Button>
  )
}

HideButton.propTypes = {
  articleId: T.number.isRequired,
  status: T.string.isRequired,
  classes: T.object.isRequired,
  refetchArticle: T.func,
}

export default withStyles(theme => ({
  root: {
    display: 'flex',
    whiteSpace: 'initial',
    textAlign: 'left',
    ...theme.typography.h4,
  },
  icon: {
    marginRight: theme.spacing(),
    color: theme.palette.text.secondary,
  },
  secondary: {
    color: theme.palette.secondary.main,
  },
}))(HideButton)
