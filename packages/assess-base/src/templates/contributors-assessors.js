import React, { useContext, useState } from 'react'
import {
  Typography,
  withStyles,
  Grid,
  Button,
  TableRow,
  TableCell,
} from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { getAssessmentParts } from 'efqm-theme/assessments/getAssessmentParts'
import { Link } from 'gatsby'
import HelpIcon from '@material-ui/icons/Help'
import get from 'lodash/get'
import { Redirect } from '@reach/router'
import {
  AuthContext,
  useAuthorizedQuery,
  TypedChip,
  PaddedContainer,
  SectionTitle,
  useAdminTable,
  UserFilter,
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
import { useMutation } from 'graphql-hooks'
import {
  getCanEditAssesors,
  getCanEditContributors,
} from '../utils/permission-checks'

function ContributorsAssessorsTemplate({
  location,
  theme,
  classes,
  pageContext: { assessment: contextAssessment },
}) {
  const [filterText, setFilterText] = useState('')
  const { t, i18n } = useTranslation()
  const lang = i18n.language || 'en'
  const { assessment } = getAssessmentParts(contextAssessment.key, lang)

  const assessmentId = getAssessmentId(location)
  const { getUserTokenData, getUserAuth } = useContext(AuthContext)
  const { isAdmin, groupId } = getUserTokenData()

  const { data: assessmentData } = useAuthorizedQuery(
    getShallowAssessmentData,
    { id: assessmentId },
    {
      onPreFetch: variables => !!variables.id,
      onFetch: data => get(data, 'assessment_by_pk'),
    }
  )

  const {
    data: assessorsData,
    refetch: fetchAssessmentContributorsAssessorsData,
  } = useAuthorizedQuery(
    getAssessmentContributorsAssessorsData,
    { assessmentId },
    {
      onPreFetch: variables => !!variables.assessmentId,
    }
  )

  const assessors = get(assessorsData, 'assessors', [])
  const contributors = get(assessorsData, 'contributors', [])

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
    fetchAssessmentContributorsAssessorsData({ assessmentId })
  }

  const [deleteAssessmentContributor] = useMutation(
    deleteAssessmentContributorMutation
  )
  async function unassignContributor(user) {
    const variables = { assessmentId, contributorId: user.id }
    await deleteAssessmentContributor({ variables })
    refetchUnassigned()
    fetchAssessmentContributorsAssessorsData({ assessmentId })
  }

  const [upsertAssessmentAssessor] = useMutation(
    upsertAssessmentAssessorMutation
  )
  async function assignAssessor(user) {
    const variables = { assessmentId, assessorId: user.id }
    await upsertAssessmentAssessor({ variables })
    refetchUnassigned()
    fetchAssessmentContributorsAssessorsData({ assessmentId })
  }

  const [deleteAssessmentAssessor] = useMutation(
    deleteAssessmentAssessorMutation
  )
  async function unassignAssessor(user) {
    const variables = { assessmentId, assessorId: user.id }
    await deleteAssessmentAssessor({ variables })
    refetchUnassigned()
    fetchAssessmentContributorsAssessorsData({ assessmentId })
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
                  {t('Select')}
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
                  {t('Select')}
                </Button>
              </TableCell>
            ) : null}
          </TableRow>
        )
      })
    },
  })

  if (!(assessmentId || isAdmin)) {
    return <Redirect to="/auth" noThrow />
  }

  return (
    <>
      <SEO title={get(assessmentData, 'name', 'Contributors and Assessors')} />
      <PaddedContainer>
        <Button
          component={Link}
          to={`/assessment/${assessment.key}/#${assessmentId}`}
          color="secondary"
        >
          ◀ {t('Assessment Home')}
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
                    {t(
                      get(assessmentData, 'internal')
                        ? 'internal assessment name'
                        : 'external assessment name'
                    )}
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Typography variant="h2" color="primary">
                    {get(assessmentData, 'name', t('Loading...'))}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
        <div className={classes.section}>
          <Typography variant="h1">
            {t('Assign Contributors and Assessors')}
          </Typography>
        </div>
        <div className={classes.section}>
          <Grid container>
            <Grid item xs={12} className={classes.participants}>
              {assessors.map(({ assessor }) =>
                assessor ? (
                  <TypedChip
                    key={assessor.id}
                    name={`${assessor.first_name} ${assessor.last_name}`}
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
                    name={`${contributor.first_name} ${contributor.last_name}`}
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
              <UserFilter setFilterText={setFilterText} />
              <Button
                component={Link}
                to={`/assessment/${assessment.key}/#${assessmentId}`}
                color="secondary"
                variant="contained"
              >
                {t('Close')}
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
