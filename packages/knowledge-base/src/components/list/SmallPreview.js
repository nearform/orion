import React from 'react'
import T from 'prop-types'
import { withStyles } from '@material-ui/core'
import get from 'lodash/get'
import useAmplifyImage from '../../hooks/useAmplifyImage'
import { formatDateAsMonthAndYear } from '../../utils/date'
import { navigate } from '@reach/router'
import { ButtonBase, Grid } from '@material-ui/core'

const SmallPreview = ({ article, classes }) => {
  const thumbnail = useAmplifyImage(article.thumbnail)
  return (
    <ButtonBase onClick={() => navigate(`/content/${article.path}`)}>
      <div key={article.id} className={classes.article}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <div
              className={classes.articleImage}
              style={{
                backgroundImage: thumbnail ? `url(${thumbnail})` : undefined,
              }}
            />
          </Grid>
          <Grid item xs={8} className={classes.textBlock}>
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
          </Grid>
        </Grid>
      </div>
    </ButtonBase>
  )
}

const styles = theme => ({
  article: {
    cursor: 'pointer',
    textAlign: 'left',
    marginTop: theme.spacing(4),
  },
  articleImage: {
    width: '56px',
    height: '65px',
    backgroundColor: theme.palette.background.light,
    backgroundPosition: 'left',
    backgroundSize: 'cover',
  },
  textBlock: {
    marginLeft: theme.spacing(1),
    '& *': {
      marginBottom: theme.spacing(0.5),
    },
  },
  taxonomyLabel: {
    color: theme.palette.secondary.main,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: '11px',
    letterSpacing: '1.23px',
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
})

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
export default withStyles(styles)(SmallPreview)
