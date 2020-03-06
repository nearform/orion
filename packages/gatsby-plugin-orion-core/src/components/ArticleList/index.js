import React from 'react'
import T from 'prop-types'
import { Link } from '@reach/router'
import { makeStyles, Grid, Typography } from '@material-ui/core'
import { format } from 'date-fns'
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt'

const gridItemStyles = makeStyles(theme => {
  return { ...theme.articleList.gridItem }
})

const rowItemStyles = makeStyles(theme => {
  return { ...theme.articleList.rowItem }
})

const highlightItemStyles = makeStyles(theme => {
  return { ...theme.articleList.highlightItem }
})

function setRowItemSize(withFeatured) {
  const standard = {
    xs: 12,
    sm: 12,
  }

  if (withFeatured) {
    return {
      ...standard,
      md: true,
      lg: true,
    }
  }

  return { ...standard }
}

function GridArticleItem({ article, options, type, isFeatured = false }) {
  const classes =
    type === 'highlights'
      ? highlightItemStyles()
      : type === 'rows'
      ? rowItemStyles()
      : gridItemStyles()

  let itemProps = {}
  let imageProps = {}
  let contentProps = {}

  if (type === 'grid') {
    itemProps = {
      ...setRowItemSize(options.withFeatured),
      direction: 'column',
      spacing: 0,
    }
    imageProps = {}
  }

  if (type === 'rows') {
    itemProps = {
      xs: 12,
      spacing: 3,
    }

    imageProps = {
      xs: 12,
      md: 4,
      lg: 3,
    }

    contentProps = {
      xs: 12,
      md: 8,
      lg: 9,
    }
  }

  if (type === 'highlights') {
    itemProps = {
      xs: 12,
    }

    imageProps = {
      xs: 12,
      md: 5,
      lg: 4,
    }

    contentProps = {
      xs: 12,
      md: 7,
      lg: 8,
    }
  }

  if (isFeatured) {
    itemProps = {
      xs: 12,
      lg: 12,
      spacing: 2,
    }

    imageProps = {
      xs: 12,
      md: 8,
      lg: 8,
    }

    contentProps = {
      xs: 12,
      md: 4,
      lg: 4,
    }
  }

  return (
    <Grid
      container
      item
      component="article"
      {...itemProps}
      classes={{ root: classes.root }}
      className={isFeatured ? classes.featured : null}
    >
      {!options.suppressImage && article.image && (
        <Grid item {...imageProps}>
          <Link to={article.path}>
            <img
              src={article.image}
              alt={article.title}
              className={options.clipImage ? classes.clippedImage : null}
            />
          </Link>
        </Grid>
      )}
      <Grid item {...contentProps}>
        {article.published && (
          <Typography gutterBottom variant="h5" color="secondary">
            {format(new Date(article.published), 'MMMM yyyy')}
          </Typography>
        )}
        {article.title && (
          <Typography gutterBottom variant="h3">
            <Link to={article.path}>{article.title}</Link>
          </Typography>
        )}
        {!options.suppressSummary && article.summary && (
          <Typography gutterBottom variant="body1">
            {article.summary}
          </Typography>
        )}
        {article.path && (
          <Typography variant="body1">
            <Link to={article.path}>
              Read on <ArrowRightAltIcon />
            </Link>
          </Typography>
        )}
      </Grid>
    </Grid>
  )
}

const optionsProps = T.shape({
  withFeatured: T.bool,
  suppressImage: T.bool,
  suppressSummary: T.bool,
  clipImage: T.bool,
})

GridArticleItem.propTypes = {
  article: T.shape({
    id: T.string,
    image: T.string,
    title: T.string,
    summary: T.string,
    path: T.string,
    published: T.string,
  }).isRequired,
  isFeatured: T.bool,
  options: optionsProps,
  type: T.oneOf(['grid', 'rows', 'highlights']),
}

GridArticleItem.defaultProps = {
  isFeatured: false,
  options: {},
  type: 'grid',
}

function ArticleList({ title, type = 'grid', options = {}, articles }) {
  const containerProps = {
    spacing: type === 'highlights' ? 0 : 4,
  }

  return (
    <>
      {title && (
        <Grid container {...containerProps}>
          <Grid item>
            <Typography variant="h5">{title}</Typography>
          </Grid>
        </Grid>
      )}
      <Grid container component="section" {...containerProps}>
        {articles.map((article, index) => (
          <GridArticleItem
            key={article.id}
            type={type}
            article={article}
            options={options}
            featured={options.withFeatured && index === 0}
          />
        ))}
      </Grid>
    </>
  )
}

ArticleList.propTypes = {
  title: T.string,
  type: T.oneOf(['grid', 'rows', 'highlights']),
  options: optionsProps,
  articles: T.array.isRequired,
}

ArticleList.defaultProps = {
  title: undefined,
  type: 'grid',
  options: {},
}

export default ArticleList
