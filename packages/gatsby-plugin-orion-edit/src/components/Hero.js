import React from 'react'
import Hero from 'gatsby-plugin-orion-view/src/components/Hero/Wrap'
import createPropEditor from './PropEditor'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    border: `1px dashed ${theme.palette.common.black}`,
    margin: '-16px 0 0 -16px',
    padding: '36px 16px 16px',
    width: 'calc(100% + 32px)',
  },
}))

const HeroEditor = props => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Hero {...props} />
    </div>
  )
}

export default {
  editor: HeroEditor,
  preview: Hero,
  settings: createPropEditor({
    image: {
      label: 'Image',
      required: true,
      type: 'string',
    },
    title: {
      label: 'Title',
      required: true,
      type: 'string',
    },
    subtitle: {
      label: 'Subtitle',
      required: true,
      type: 'string',
    },
  }),
}
