import React, { useState } from 'react'
import SerpPreview from 'react-serp-preview'
import { Container, Grid, Typography, makeStyles } from '@material-ui/core'
import MetadataItem from './MetadataItem'

const defaultContent = [
  {
    label: 'Page Title',
    name: 'title',
    type: 'title',
    value: '',
  },
  {
    label: 'Page Description',
    type: 'meta',
    name: 'description',
    multiline: true,
    value: '',
  },
  {
    label: 'Open Graph Type',
    type: 'meta',
    name: 'og:type',
    property: 'og:type',
    value: '',
  },
  {
    label: 'Open Graph Title',
    type: 'meta',
    name: 'og:title',
    property: 'og:title',
    value: '',
  },
  {
    label: 'Open Graph Description',
    type: 'meta',
    name: 'og:description',
    property: 'og:description',
    multiline: true,
    value: '',
  },
  {
    label: 'Open Graph Image',
    type: 'meta',
    name: 'og:image',
    property: 'og:image',
    value: '',
  },
  {
    label: 'Structured Data',
    type: 'script',
    name: 'structuredData',
    multiline: true,
    value: '{}',
  },
]

function replaceAt(array, index, value) {
  const ret = array.slice(0)
  ret[index] = value
  return ret
}

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
