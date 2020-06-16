import React from 'react'
import T from 'prop-types'
import {
  Grid,
  Typography,
  makeStyles,
  useMediaQuery,
  Card,
  CardMedia,
  CardContent,
} from '@material-ui/core'
import { Link } from '@reach/router'
import { format } from 'date-fns'
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt'

import commonThemes from './CommonThemes'
const fullHeight = { height: '100%' }

const gridItemStyles = makeStyles(theme => ({
  card: {
    height: '100%',
    '& .MuiCardContent-root': {
      padding: theme.spacing(0),
      marginTop: theme.spacing(1.5),
    },
    ...commonThemes(theme),
  },
  featured: {
    minWidth: '100%',
    maxWidth: '50%',
  },
  clippedImage: {
    clipPath: 'polygon(0 0, 100% 0%, 75% 100%, 0 100%)',
  },
  fullHeight,
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

function GridArticleCard({ article, options, isFeatured = false }) {
  const classes = gridItemStyles()

  const itemProps = {
    ...setRowItemSize(options.withFeatured),
    direction: 'column',
    spacing: 0,
    justify: 'space-between',
  }

  const largerThan1050px = useMediaQuery('(min-width:1050px)')
  const between850And1049px = useMediaQuery(
    '(min-width:850px) and (max-width:1049px)'
  )
  let gridItemGridSize = 12

  if (largerThan1050px) {
    gridItemGridSize = 4
  }

  if (between850And1049px) {
    gridItemGridSize = 6
  }

  return (
    <Grid container item xs={gridItemGridSize}>
      <Grid
        container
        item
        component="article"
        {...itemProps}
        className={isFeatured ? classes.featured : null}
      >
        <Card className={classes.card} elevation={0}>
          <Grid
            container
            justify="space-between"
            className={classes.fullHeight}
          >
            <Grid item xs={12}>
              {!options.suppressImage && (
                <Link to={article.path}>
                  <CardMedia
                    className={options.clipImage && classes.clippedImage}
                    title="Article Image"
                    image={article.image}
                  />
                </Link>
              )}
              <CardContent className={classes.cardContent}>
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
              </CardContent>
            </Grid>
            <Grid container item xs={12} alignItems="flex-end">
              {article.path && (
                <Grid item xs={12}>
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
                </Grid>
              )}
            </Grid>
          </Grid>
        </Card>
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

GridArticleCard.propTypes = {
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
}

GridArticleCard.defaultProps = {
  isFeatured: false,
  options: {},
}

export default GridArticleCard
