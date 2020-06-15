import React from 'react'
import T from 'prop-types'
import { Grid, Typography } from '@material-ui/core'
import GridArticleItem from './GridArticleItem'

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

const optionsProps = T.shape({
  withFeatured: T.bool,
  suppressImage: T.bool,
  suppressSummary: T.bool,
  clipImage: T.bool,
})

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
