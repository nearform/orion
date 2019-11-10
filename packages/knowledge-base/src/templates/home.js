import React from 'react'
import {
  Button,
  Grid,
  Typography,
  withStyles,
  Box,
  useMediaQuery,
} from '@material-ui/core'
import { Link as RouterLink } from '@reach/router'
import { PaddedContainer } from 'components'

import SEO from '../components/SEO'
import EditorsPicks from '../components/list/EditorsPicks'
import PageSection from '../components/layout/page-section'
import PersonalizedLists from '../components/list/PersonalizedLists'
import column from '../components/layout/flex-with-gap/column'
import GainKnowledgeLinks from '../components/list/gain-knowledge-links'
import MostRecentArticles from '../components/list/most-recent-articles'
import EventList from '../components/list/event-list'
import row from '../components/layout/flex-with-gap/row'
import HeroImageWrapper from '../components/layout/hero-image-wrapper'

function KnowledgeHome({ classes }) {
  const isMobile = useMediaQuery('(max-width: 800px)')

  const content = (
    <>
      <SEO title="Knowledge Base Home Page" />
      <div className={classes.header}>
        <PaddedContainer className={classes.heroDescription}>
          <Grid container spacing={3} direction="column">
            <Grid item xs={isMobile ? 12 : 4}>
              <Typography variant="h1">
                Gain knowledge from the world's leading organisations
              </Typography>
            </Grid>
            <Grid item xs={isMobile ? 12 : 5}>
              <Typography variant="body2">
                EFQM pride themselves on their knowledge base. We want you our
                members to learn and improve and see how your company can reach
                excellence.
              </Typography>
            </Grid>
            <Grid item container spacing={3} direction="row">
              <Grid item>
                <Button
                  color="secondary"
                  variant="outlined"
                  component={RouterLink}
                  to="/my-content/add"
                >
                  Submit to knowledge base
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </PaddedContainer>
      </div>
      <PageSection>
        <Box className={classes.primaryArticleLists}>
          <EditorsPicks />
          <PersonalizedLists />
        </Box>
      </PageSection>
      <div className={classes.hideMobile}>
        <PageSection
          className={classes.mostRecentAndEvents}
          paletteColor={['background', 'light']}
        >
          <MostRecentArticles className={classes.mostRecent} />
          <EventList className={classes.eventList} />
        </PageSection>
        <PageSection>
          <GainKnowledgeLinks />
        </PageSection>
      </div>
    </>
  )

  return isMobile ? (
    <div>{content}</div>
  ) : (
    <HeroImageWrapper>{content}</HeroImageWrapper>
  )
}

const styles = theme => ({
  header: {
    paddingBottom: '140px',
    position: 'relative',
    '@media (max-width: 800px)': {
      paddingBottom: '0px',
    },
  },
  heroDescription: {
    marginTop: theme.spacing(13),
    '@media (max-width: 800px)': {
      marginTop: theme.spacing(3),
    },
  },
  primaryArticleLists: column(theme)(6),
  mostRecentAndEvents: row(theme)(5),
  eventList: {
    flexBasis: '35%',
    minWidth: 0,
  },
  mostRecent: {
    flexBasis: '65%',
    minWidth: 0,
  },
  hideMobile: {
    '@media (max-width: 800px)': {
      display: 'none',
    },
  },
})

export default withStyles(styles, { withTheme: true })(KnowledgeHome)
