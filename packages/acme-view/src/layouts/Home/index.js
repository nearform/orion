import React from 'react'
import Layout from '../../components/Layout'
import PaddedContainer from 'gatsby-plugin-orion-core/src/components/PaddedContainer'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  hero: {
    margin: '-32px 0 32px 0',
    '& > div': {
      maxWidth: '100%',
      padding: '100px 0',
      '& > div': {
        padding: '0 !important',
      },
    },
  },
  section: {
    padding: 32,
    '&:nth-child(2)': {
      backgroundColor: theme.palette.background.dark,
    },
  },
}))

function HomeLayout({ hero, one, two, three, four, page, menu }) {
  const classes = useStyles()

  return (
    <Layout suppressSecondaryAppBar page={page} menu={menu}>
      <div className={classes.hero}>{hero}</div>
      <div className={classes.content}>
        <div className={classes.section}>
          <PaddedContainer>{one}</PaddedContainer>
        </div>
        <div className={classes.section}>
          <PaddedContainer>{two}</PaddedContainer>
        </div>
        <div className={classes.section}>
          <PaddedContainer>{three}</PaddedContainer>
        </div>
        <div className={classes.section}>
          <PaddedContainer>{four}</PaddedContainer>
        </div>
      </div>
    </Layout>
  )
}

export default HomeLayout
