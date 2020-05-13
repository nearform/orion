import React from 'react'
import T from 'prop-types'
import { Link } from '@reach/router'
import { makeStyles, Grid, Typography } from '@material-ui/core'
import { format } from 'date-fns'
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt'

const common = theme => ({
  '& .MuiGrid-item img': {
    width: '100%',
    marginBottom: 11,
  },
  '& .MuiGrid-item h3': {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    lineClamp: 4,
    display: 'box',
    boxOrient: 'vertical',
    '& a': {
      color: theme.palette.secondary.main,
      textDecoration: 'none',
    },
  },
  '& .MuiGrid-item p': {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    lineClamp: 4,
    display: 'box',
    boxOrient: 'vertical',
  },
  '& .MuiGrid-item h5': {
    opacity: 0.6,
  },
  '& .MuiGrid-item a': {
    display: 'block',
  },
  '& .MuiGrid-item:last-of-type a': {
    display: 'flex',
    alignItems: 'center',
  },
})

const featured = {
  minWidth: '100%',
  maxWidth: '50%',
}

const clippedImage = {
  clipPath: 'polygon(0 0, 100% 0%, 75% 100%, 0 100%)',
}

const gridItemStyles = makeStyles(theme => ({
  root: {
    minWidth: '33.3%',
    maxWidth: '50%',
    flex: 1,
    ...common(theme),
  },
  featured,
  clippedImage,
}))

const rowItemStyles = makeStyles(theme => ({
  root: {
    ...common(theme),
  },
  featured,
  clippedImage,
}))

const highlightItemStyles = makeStyles(theme => ({
  root: {
    ...common(theme),
    boxShadow:
      '0 13px 27px -5px rgba(50, 50, 93, 0.25), 0 8px 4px -8px rgba(0, 0, 0, 0.1), 0 -6px 16px -6px rgba(0, 0, 0, 0.02)',
    borderRadius: 4,
    marginBottom: 50,
    overflow: 'hidden',
    '& .MuiGrid-item:first-of-type': {
      paddingRight: 16,
      '& a': {
        display: 'block',
        height: '100%',
      },
    },
    '& .MuiGrid-item:last-of-type': {
      paddingTop: 16,
      paddingBottom: 16,
    },
    '& .MuiGrid-item img': {
      width: '100%',
      height: '100%',
    },
    '& .MuiGrid-item h5': {
      opacity: 0.6,
    },
    '& .MuiGrid-item:last-of-type a': {
      display: 'flex',
      alignItems: 'center',
    },
  },
  clippedImage,
}))

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
    id: T.number,
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

function InnerArticleList({ articles, title, type = 'grid', options = {} }) {
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
      <Grid container component="section" spacing={1} {...containerProps}>
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

InnerArticleList.propTypes = {
  articles: T.array.isRequired,
  title: T.string,
  type: T.oneOf(['grid', 'rows', 'highlights']),
  options: optionsProps,
  variables: T.object,
}

InnerArticleList.defaultProps = {
  title: undefined,
  type: 'grid',
  options: {},
  variables: undefined,
}

export default InnerArticleList
