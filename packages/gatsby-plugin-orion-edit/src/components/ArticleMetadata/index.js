import React, { useState } from 'react'
import SerpPreview from 'react-serp-preview'
import { Container, Grid, Typography, makeStyles } from '@material-ui/core'
import MetadataItem from './MetadataItem'
import { defaultContent } from './utils/constants'
import { replaceAt } from './utils/helpers'

const useItemStyles = makeStyles(theme => {
  return { ...theme.seoMetadata.item }
})

const useContainerStyles = makeStyles(theme => {
  return { ...theme.seoMetadata.container }
})

const ArticleMetadata = ({
  url = 'https://www.google.com',
  content = defaultContent,
}) => {
  const classes = useContainerStyles()
  const itemClasses = useItemStyles()
  const [state, setState] = useState(content)
  const handleChange = (index, item) => {
    setState(replaceAt(state, index, item))
  }

  const title = state.find(i => i.type === 'title')
  const description = state.find(i => i.name === 'description')

  return (
    <Container classes={classes}>
      <Grid container>
        <Grid item xs={6}>
          <Typography gutterBottom variant="h5">
            Page Metadata
          </Typography>
          <Container disableGutters classes={itemClasses}>
            {state &&
              state.map((item, index) => {
                return (
                  <MetadataItem
                    key={`item-${item.name}`}
                    item={item}
                    index={index}
                    handleChange={handleChange}
                  />
                )
              })}
          </Container>
        </Grid>
        <Grid item xs={6}>
          <Typography gutterBottom variant="h5">
            Search Engine Preview
          </Typography>
          <div className="serp-preview">
            <SerpPreview
              title={(title && title.value) || 'Example Title'}
              metaDescription={
                (description && description.value) || 'Example Description'
              }
              url={url}
              width={600}
            />
          </div>
        </Grid>
      </Grid>
    </Container>
  )
}

export default ArticleMetadata
