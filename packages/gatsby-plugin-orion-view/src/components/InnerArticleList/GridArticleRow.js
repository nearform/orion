import React from 'react'
import T from 'prop-types'
import {
  Grid,
  Typography,
  makeStyles,
  Card,
  CardMedia,
  CardContent,
} from '@material-ui/core'
import { Link } from '@reach/router'
import { format } from 'date-fns'
import classnames from 'classnames'
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt'

import commonThemes from './CommonThemes'

const featured = {
  minWidth: '100%',
  maxWidth: '50%',
}

const clippedImage = {
  clipPath: 'polygon(0 0, 100% 0%, 75% 100%, 0 100%)',
}

const fullHeight = { height: '100%' }

const rowItemStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(2, 0),
  },
  card: {
    '& .MuiCardContent-root': {
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(0, 0, 0, 3),
      },
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(3, 0),
      },
    },
    ...commonThemes(theme),
  },
  featured,
  clippedImage,
  fullHeight,
}))

const highlightItemStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(3, 12),
  },
  card: {
    ...commonThemes(theme),
    '& .MuiCardMedia-root': {
      height: 0,
      paddingTop: '62%',
    },
    boxShadow:
      '0 13px 27px -5px rgba(50, 50, 93, 0.25), 0 8px 4px -8px rgba(0, 0, 0, 0.1), 0 -6px 16px -6px rgba(0, 0, 0, 0.02)',
    '& .MuiCardContent-root': {
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(2, 1, 2, 3),
      },
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(2),
      },
    },
  },
  clippedImage,
  fullHeight,
}))

function GridArticleRow({ article, options, type, isFeatured = false }) {
  const classes =
    type === 'highlights' ? highlightItemStyles() : rowItemStyles()

  let itemProps = {}
  let imageProps = {}
  let contentProps = {}

  if (type === 'rows') {
    itemProps = {
      xs: 12,
      spacing: 3,
    }

    imageProps = {
      xs: 12,
      md: 4,
    }

    contentProps = {
      xs: 12,
      md: 8,
    }
  }

  if (type === 'highlights') {
    itemProps = {
      xs: 12,
    }

    imageProps = {
      xs: 12,
      md: 5,
    }

    contentProps = {
      xs: 12,
      md: 7,
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
      className={classnames({
        [classes.featured]: isFeatured,
        [classes.root]: Boolean(classes.root),
      })}
    >
      <Card className={classes.card} elevation={0}>
        <Grid container>
          <Grid item {...imageProps}>
            <Link to={article.path}>
              <CardMedia
                className={options.clipImage && classes.clippedImage}
                image={article.image}
                title="Article Image"
              />
            </Link>
          </Grid>
          <Grid item {...contentProps}>
            <CardContent className={classes.fullHeight}>
              <Grid
                container
                direction="column"
                justify="space-between"
                alignItems="flex-start"
                className={classes.fullHeight}
              >
                <Grid item>
                  {article.published && type !== 'highlights' && (
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
                </Grid>
                <Grid item>
                  {article.path && (
                    <Typography variant="body1">
                      <Link to={article.path}>
                        <Grid container alignItems="center">
                          <Grid item>Read on </Grid>
                          <Grid item>
                            <ArrowRightAltIcon />
                          </Grid>
                        </Grid>
                      </Link>
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  )
}

const optionsProps = T.shape({
  withFeatured: T.bool,
  suppressImage: T.bool,
  suppressSummary: T.bool,
  clipImage: T.bool,
})

GridArticleRow.propTypes = {
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

GridArticleRow.defaultProps = {
  isFeatured: false,
  options: {},
  type: 'grid',
}

export default GridArticleRow
