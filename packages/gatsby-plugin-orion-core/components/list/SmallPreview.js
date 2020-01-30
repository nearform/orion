import React from 'react'
import T from 'prop-types'
import { makeStyles, Box } from '@material-ui/core'
import get from 'lodash/get'
import { useAmplifyImage } from 'components'
import { formatDateAsMonthAndYear } from '../../utils/date'

import noThumbnailFallback from 'efqm-theme/assets/logo-1x'
import ThumbnailImage from '../content/thumbnail-image'
import { Link } from 'gatsby'
import row from '../layout/flex-with-gap/row'

const smallPreviewStyles = makeStyles(theme => ({
  article: {
    ...row(theme)(1),
    cursor: 'pointer',
  },
  taxonomyLabel: {
    color: theme.palette.secondary.main,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: '11px',
    letterSpacing: '1.23px',
    minHeight: '1.43em',
  },
  articleTitle: {
    ...theme.editorsPicks.title,
  },
  articleDate: {
    ...theme.editorsPicks.date,
    marginRight: theme.spacing(1),
    display: 'inline-block',
  },
  articleAuthor: {
    ...theme.editorsPicks.author,
    display: 'inline-block',
  },
}))

const SmallPreview = ({ article, component = 'li' }) => {
  const thumbnail = useAmplifyImage(article.thumbnail)
  const classes = smallPreviewStyles({
    thumbnail,
    fallback: noThumbnailFallback,
  })

  return (
    <Box component={component}>
      <Link to={`/content/${article.path}`}>
        <div className={classes.article}>
          <ThumbnailImage
            width={56}
            height={65}
            path={useAmplifyImage(article.thumbnail)}
          />
          <Box className={classes.articleDetails}>
            <div className={classes.taxonomyLabel}>
              {get(article, 'primary_taxonomy[0].taxonomy.name')}
            </div>
            <div className={classes.articleTitle}>{article.title}</div>
            <div className={classes.articleMeta}>
              <div className={classes.articleDate}>
                {formatDateAsMonthAndYear(article.published_at)}
              </div>
              <div className={classes.articleAuthor}>
                {get(article, 'createdBy.first_name')}{' '}
                {get(article, 'createdBy.last_name')}
              </div>
            </div>
          </Box>
        </div>
      </Link>
    </Box>
  )
}

SmallPreview.propTypes = {
  article: T.shape({
    title: T.string,
    path: T.string,
    published_at: T.string,
    primary_taxonomy: T.arrayOf(
      T.shape({
        taxonomy: T.shape({
          name: T.string,
        }),
      })
    ),
    createdBy: T.shape({
      first_name: T.string,
      last_name: T.string,
    }),
  }),
}

export default SmallPreview
