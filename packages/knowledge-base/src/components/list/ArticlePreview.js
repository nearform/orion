import React from 'react'
import T from 'prop-types'
import { withStyles } from '@material-ui/core'
import get from 'lodash/get'
import useAmplifyImage from '../../hooks/useAmplifyImage'
import { formatDateAsMonthAndYear } from '../../utils/date'
import { navigate } from '@reach/router'
import { ButtonBase } from '@material-ui/core'
const ArticlePreview = ({ article, classes }) => {
  const thumbnail = useAmplifyImage(article.thumbnail)
  return (
    <ButtonBase onClick={() => navigate(`/content/${article.path}`)}>
      <div key={article.id} className={classes.article}>
        <div
          className={classes.articleImage}
          style={{
            backgroundImage: thumbnail ? `url(${thumbnail})` : undefined,
          }}
        />
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
      </div>
    </ButtonBase>
  )
}

const styles = theme => ({
  article: {
    marginLeft: theme.spacing(3),
    '&:first-child': {
      marginLeft: theme.spacing(2),
    },
    cursor: 'pointer',
  },
  articleImage: {
    width: '320px',
    height: '160px',
    backgroundColor: theme.palette.background.light,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  },
  taxonomyLabel: {
    ...theme.editorsPicks.caption,
    paddingLeft: theme.spacing(2),
    width: '255px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.palette.primary.main,
    marginTop: `-26px`,
    marginBottom: theme.spacing(1),
  },
  articleTitle: theme.editorsPicks.title,
  articleMeta: {
    display: 'flex',
  },
  articleDate: {
    ...theme.editorsPicks.date,
    marginRight: theme.spacing(1),
  },
  articleAuthor: theme.editorsPicks.author,
})

ArticlePreview.propTypes = {
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
export default withStyles(styles)(ArticlePreview)
