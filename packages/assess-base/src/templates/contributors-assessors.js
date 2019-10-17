import React, { useContext, useEffect, useState } from 'react'
import {
  Typography,
  withStyles,
  Grid,
  Button,
  Input,
  TableRow,
  TableCell,
} from '@material-ui/core'
import { Link } from 'gatsby'
import HelpIcon from '@material-ui/icons/Help'
import get from 'lodash/get'
import { Redirect } from '@reach/router'

import {
  AuthContext,
  TypedChip,
  PaddedContainer,
  SectionTitle,
  useAdminTable,
} from 'components'

import { getAssessmentId } from '../utils/url'
import ContextualHelp from '../components/ContextualHelp'
import SEO from '../components/SEO'
import {
  getUnassignedContributorsAssessorsData,
  getAssessmentContributorsAssessorsData,
  getShallowAssessmentData,
  upsertAssessmentContributorMutation,
  deleteAssessmentContributorMutation,
  upsertAssessmentAssessorMutation,
  deleteAssessmentAssessorMutation,
} from '../queries'
import { useManualQuery } from 'graphql-hooks'
import { useMutation } from 'graphql-hooks'
import FilterListIcon from '@material-ui/icons/FilterList'
import {
  getCanEditAssesors,
  getCanEditContributors,
} from '../utils/permission-checks'

function _placeholderEtoN(email) {
  return email
    .split('@')[0]
    .split('.')
    .map(n => n.charAt(0).toUpperCase() + n.slice(1))
    .join(' ')
}

function ContributorsAssessorsTemplate({
  location,
  theme,
  classes,
  pageContext: { assessment },
}) {
  const [filterText, setFilterText] = useState('')

  const assessmentId = getAssessmentId(location)
  const { getUserTokenData, getUserAuth } = useContext(AuthContext)
  const { isAdmin, groupId } = getUserTokenData()
  if (!assessmentId && !isAdmin) {
    return <Redirect to="/auth" noThrow />
  }

  const [fetchShallowAssessmentData, { data: assessmentByPk }] = useManualQuery(
    getShallowAssessmentData,
    {
      variables: {
        id: assessmentId,
      },
    }
  )

  const [fetchAssessmentContributorsAssessorsData, { data }] = useManualQuery(
    getAssessmentContributorsAssessorsData,
    {
      variables: { assessmentId },
    }
  )
  useEffect(() => {
    if (!assessmentByPk) {
      fetchShallowAssessmentData()
    }
    if (!data) {
      fetchAssessmentContributorsAssessorsData()
    }
  }, [
    fetchShallowAssessmentData,
    assessmentByPk,
    fetchAssessmentContributorsAssessorsData,
    data,
  ])

  const assessmentData = get(assessmentByPk, 'assessment_by_pk')
  const assessors = get(data, 'assessors', [])
  const contributors = get(data, 'contributors', [])

  const canEditAssesors = getUserAuth('platform-admin')
    ? true
    : getCanEditAssesors(groupId, assessmentData)
  const canEditContributors = getUserAuth('platform-admin')
    ? true
    : getCanEditContributors(groupId, assessmentData)

  const headers = [
    { id: 'id', label: 'ID' },
    { id: 'email', label: 'Email' },
    { id: 'group', label: 'Group' },
  ]
  if (canEditContributors) {
    headers.push({ id: 'contributor', label: 'Contributor' })
  }
  if (canEditAssesors) {
    headers.push({ id: 'assessor', label: 'Assessor' })
  }
  const [upsertAssessmentContributor] = useMutation(
    upsertAssessmentContributorMutation
  )
  async function assignContributor(user) {
    const variables = { assessmentId, contributorId: user.id }
    await upsertAssessmentContributor({ variables })
    refetchUnassigned()
    fetchAssessmentContributorsAssessorsData()
  }

  const [deleteAssessmentContributor] = useMutation(
    deleteAssessmentContributorMutation
  )
  async function unassignContributor(user) {
    const variables = { assessmentId, contributorId: user.id }
    await deleteAssessmentContributor({ variables })
    refetchUnassigned()
    fetchAssessmentContributorsAssessorsData()
  }

  const [upsertAssessmentAssessor] = useMutation(
    upsertAssessmentAssessorMutation
  )
  async function assignAssessor(user) {
    const variables = { assessmentId, assessorId: user.id }
    await upsertAssessmentAssessor({ variables })
    refetchUnassigned()
    fetchAssessmentContributorsAssessorsData()
  }

  const [deleteAssessmentAssessor] = useMutation(
    deleteAssessmentAssessorMutation
  )
  async function unassignAssessor(user) {
    const variables = { assessmentId, assessorId: user.id }
    await deleteAssessmentAssessor({ variables })
    refetchUnassigned()
    fetchAssessmentContributorsAssessorsData()
  }

  const { table, refetch: refetchUnassigned } = useAdminTable({
    query: getUnassignedContributorsAssessorsData,
    variables: {
      assessmentId,
      groupId,
      filter: `%${filterText}%`,
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
            {canEditContributors ? (
              <TableCell>
                <Button
                  onClick={e => assignContributor(user)}
                  color="secondary"
                  variant="outlined"
                >
                  Select
                </Button>
              </TableCell>
            ) : null}
            {canEditAssesors ? (
              <TableCell>
                <Button
                  onClick={e => assignAssessor(user)}
                  color="secondary"
                  variant="outlined"
                >
                  Select
                </Button>
              </TableCell>
            ) : null}
          </TableRow>
        )
      })
    },
  })

  return (
    <>
      <SEO title={get(assessmentData, 'name', 'Contributors and Assessors')} />
      <PaddedContainer>
        <Button
          component={Link}
          to={`assessment/${assessment.key}/#${assessmentId}`}
          color="secondary"
        >
          ◀ Assessment Home
        </Button>
        <div className={classes.section}>
          <Grid container spacing={4} direction="column">
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
              <Grid container direction="column" spacing={1}>
                <Grid item>
                  <Typography variant="h4">
                    {get(assessmentData, 'internal') ? 'internal' : ''}{' '}
                    assessment name
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Typography variant="h2" color="primary">
                    {get(assessmentData, 'name', 'Loading...')}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
        <div className={classes.section}>
          <Typography variant="h1">
            Assign contributors and assessors
          </Typography>
        </div>
        <div className={classes.section}>
          <Grid container>
            <Grid item xs={12} className={classes.participants}>
              {assessors.map(({ assessor }) =>
                assessor ? (
                  <TypedChip
                    key={assessor.id}
                    name={_placeholderEtoN(assessor.email)}
                    onDelete={
                      canEditAssesors ? () => unassignAssessor(assessor) : null
                    }
                    type="Assessor"
                    color="primary"
                  />
                ) : null
              )}
              {contributors.map(({ contributor }) =>
                contributor ? (
                  <TypedChip
                    key={contributor.id}
                    name={_placeholderEtoN(contributor.email)}
                    onDelete={
                      canEditContributors
                        ? () => unassignContributor(contributor)
                        : null
                    }
                    type="Contributor"
                    color="secondary"
                  />
                ) : null
              )}
            </Grid>
            <Grid item xs={12} className={classes.filterContainer}>
              <Input
                fullWidth
                className={classes.filterInput}
                endAdornment={<FilterListIcon color="secondary" />}
                onChange={event => setFilterText(event.target.value)}
              />
              <Button
                component={Link}
                to={`assessment/${assessment.key}/#${assessmentId}`}
                color="secondary"
                variant="contained"
              >
                Close
              </Button>
            </Grid>
          </Grid>
          {table}
        </div>
      </PaddedContainer>
    </>
  )
}

const styles = theme => ({
  section: {
    margin: theme.spacing(3, 0),
  },
  sectionTitle: {
    display: 'flex',
    alignItems: 'center',
  },
  helpIcon: {
    marginLeft: theme.spacing(1),
  },
  keyInformationInput: {
    marginBottom: theme.spacing(2),
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
    marginBottom: theme.spacing(2),
  },
  buttonBar: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'flex-end',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
  displayNone: {
    display: 'none',
  },
  switch: {
    height: theme.spacing(4),
  },
  filterContainer: {
    margin: theme.spacing(1),
    marginLeft: 0,
    display: 'flex',
    alignItems: 'flex-end',
  },
  filterInput: {
    maxWidth: 318,
    margin: '0 auto 0 0',
  },
  participants: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginRight: -theme.spacing(1),
    '& > *': {
      marginRight: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  },
})

export default withStyles(styles, { withTheme: true })(
  ContributorsAssessorsTemplate
)
