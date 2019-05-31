import React from 'react'
import {
  Typography,
  withStyles,
  Grid,
  Button,
  Switch,
  AppBar,
  Toolbar,
  TableRow,
  TableCell,
} from '@material-ui/core'
import { PaddedContainer } from 'components'
import { Link } from 'gatsby'
import HelpIcon from '@material-ui/icons/Help'
import get from 'lodash/get'
import { Redirect } from '@reach/router'

import SEO from '../components/seo'
import SectionTitle from '../components/SectionTitle'
import { isAdminSync } from '../utils/auth'
import { getAssessmentId } from '../utils/url'
import ContextualHelp from '../components/ContextualHelp'
import {
  getAssessmentContributorsAssessorsData,
  getShallowAssessmentData,
  upsertAssessmentContributorMutation,
  deleteAssessmentContributorMutation,
} from '../queries'
import { useQuery } from 'graphql-hooks'
import useAdminTable from '../components/useAdminTable'
import { useMutation } from 'graphql-hooks'

const headers = [
  { id: 'id', label: 'ID' },
  { id: 'email', label: 'Email' },
  { id: 'group', label: 'Group' },
  { id: 'contributor', label: 'Contributor' },
  { id: 'assessor', label: 'Assessor' },
]

function ContributorsAssessorsTemplate({
  location,
  theme,
  classes,
  pageContext: { assessment },
}) {
  const assessmentId = getAssessmentId(location)
  const isAdmin = isAdminSync()

  if (!assessmentId && !isAdmin) {
    return <Redirect to="/auth" noThrow />
  }

  const { data: assessmentData } = useQuery(getShallowAssessmentData, {
    variables: {
      id: assessmentId,
    },
  })

  const [upsertAssessmentContributor] = useMutation(
    upsertAssessmentContributorMutation
  )
  const [deleteAssessmentContributor] = useMutation(
    deleteAssessmentContributorMutation
  )

  async function handleToggleContributor(user, checked) {
    const variables = { assessmentId, contributorId: user.id }

    try {
      if (checked) {
        await upsertAssessmentContributor({ variables })
      } else {
        await deleteAssessmentContributor({ variables })
      }
    } finally {
      if (page === 1) {
        refetch()
      } else {
        setPage(1)
      }
    }
  }

  const { table, setPage, page, refetch } = useAdminTable({
    query: getAssessmentContributorsAssessorsData,
    variables: {
      assessmentId,
    },
    headers,
    renderTableBody: data => {
      return data.user.map(user => {
        return (
          <TableRow key={user.id}>
            <TableCell>{user.id}</TableCell>
            <TableCell>
              <Typography>{user.email}</Typography>
            </TableCell>
            <TableCell>{get(user, 'user_groups[0].group.name', '-')}</TableCell>
            <TableCell>
              <Switch
                checked={
                  get(
                    user,
                    'assessment_contributors_aggregate.aggregate.count'
                  ) > 0
                }
                onChange={e => handleToggleContributor(user, e.target.checked)}
              />
            </TableCell>
            <TableCell>
              <Switch
                checked={
                  get(user, 'assessment_assessors_aggregate.aggregate.count') >
                  0
                }
              />
            </TableCell>
          </TableRow>
        )
      })
    },
  })

  return (
    <>
      <SEO
        title={get(
          assessmentData,
          'assessment_by_pk.name',
          'Contributors and Assessors'
        )}
      />
      <PaddedContainer>
        <Button
          component={Link}
          to={`assessment/${assessment.key}/#${assessmentId}`}
          color="secondary"
        >
          ◀ Assessment Home
        </Button>
        <div className={classes.section}>
          <Grid container spacing={theme.spacing.unit * 4} direction="column">
            <Grid item xs={3}>
              <SectionTitle
                barColor={theme.palette.primary.dark}
                className={classes.sectionTitle}
                gutterBottom
              >
                {assessment.name}
                {assessment.guidance && (
                  <ContextualHelp helpContent={assessment.guidance}>
                    <HelpIcon color="secondary" className={classes.helpIcon} />
                  </ContextualHelp>
                )}
              </SectionTitle>
            </Grid>
            <Grid item xs>
              <Grid container direction="column" spacing={theme.spacing.unit}>
                <Grid item>
                  <Typography variant="h4">
                    {get(assessmentData, 'assessment_by_pk.internal')
                      ? 'internal'
                      : ''}{' '}
                    assessment name
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Typography variant="h2" color="primary">
                    {get(assessmentData, 'assessment_by_pk.name', 'Loading...')}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
        <div className={classes.section}>
          <AppBar position="relative" color="default">
            <Toolbar>
              <Typography variant="h1">
                Assign contributors and assessors
              </Typography>
            </Toolbar>
          </AppBar>
        </div>
        <div className={classes.section}>{table}</div>
      </PaddedContainer>
    </>
  )
}

const styles = theme => ({
  section: {
    margin: `${theme.spacing.unit * 3}px 0`,
  },
  sectionTitle: {
    display: 'flex',
    alignItems: 'center',
  },
  helpIcon: {
    marginLeft: theme.spacing.unit,
  },
  keyInformationInput: {
    marginBottom: theme.spacing.unit * 2,
  },
  sectionProgress: {
    color: theme.palette.primary.dark,
  },
  filesSeparator: {
    borderLeft: `solid 1px ${theme.palette.background.light}`,
  },
  keyInformationHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing.unit * 2,
  },
  buttonBar: {
    marginTop: theme.spacing.unit * 2,
    display: 'flex',
    justifyContent: 'flex-end',
    '& > * + *': {
      marginLeft: theme.spacing.unit * 2,
    },
  },
  displayNone: {
    display: 'none',
  },
  switch: {
    height: theme.spacing.unit * 4,
  },
})

export default withStyles(styles, { withTheme: true })(
  ContributorsAssessorsTemplate
)
