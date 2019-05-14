import React from 'react'
import { Grid, Button, Typography, withStyles } from '@material-ui/core'
import { AssessmentProgress, PaddedContainer } from 'components'
import { Link } from 'gatsby'
import { useQuery, useMutation } from 'graphql-hooks'
import { Redirect } from '@reach/router'
import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-material-ui'

import SEO from '../components/seo'
import SectionTitle from '../components/SectionTitle'
import {
  getAssessment,
  createAssessmentMutation,
  insertAssessmentTableDataMutation,
  updateAssessmentTableDataMutation,
  deleteAssessmentTableRowMutation,
} from '../queries'
import { isAuthenticatedSync, getUserIdSync } from '../utils/auth'
import AssessmentPartScoring from '../components/AssessmentPartScoring'

function getEmptyTableRow(tableDef) {
  return tableDef.columns.reduce(
    (initialValues, { key }) => ({ ...initialValues, [key]: '' }),
    {}
  )
}

function createTableRows(assessment, tableDef) {
  const tableData = getExistingTableData(assessment, tableDef)
  const emptyTableRow = getEmptyTableRow(tableDef)

  if (!tableData) {
    return [emptyTableRow]
  }

  return tableData.table_values.concat(emptyTableRow)
}

function getExistingTableData(assessment, tableDef) {
  return (
    assessment &&
    assessment.tables.find(({ table_key }) => table_key === tableDef.key)
  )
}

function CriterionPartTemplate({
  theme,
  classes,
  pageContext: {
    partNumber,
    part,
    pillar,
    criterion,
    assessment,
    pillarColor,
    previousLink,
    nextLink,
    totalParts,
  },
}) {
  if (!isAuthenticatedSync()) {
    return <Redirect to="/auth" noThrow />
  }

  const userId = getUserIdSync()

  const [createAssessment] = useMutation(createAssessmentMutation)
  const [insertTableData] = useMutation(insertAssessmentTableDataMutation)
  const [updateTableData] = useMutation(updateAssessmentTableDataMutation)
  const [deleteTableRow] = useMutation(deleteAssessmentTableRowMutation)

  const { loading, error, data: assessmentData, refetch } = useQuery(
    getAssessment,
    {
      variables: {
        assessmentKey: assessment.key,
        ownerId: userId,
        pillarKey: pillar.key,
        criterionKey: criterion.key,
        partNumber,
      },
    }
  )

  async function createNewAssessment() {
    const { data, error } = await createAssessment({
      variables: {
        key: assessment.key,
        ownerId: userId,
      },
    })

    if (error) throw error

    return data.insert_assessment.returning[0].id
  }

  async function handleSaveTable(tableDef, rowIndex, rowValues) {
    const assessmentId = assessmentData.assessment.length
      ? assessmentData.assessment[0].id
      : await createNewAssessment()

    const tableData = getExistingTableData(
      assessmentData.assessment[0],
      tableDef
    )

    if (tableData) {
      const tableValues = [...tableData.table_values]
      tableValues[rowIndex] = rowValues

      await updateTableData({
        variables: {
          id: tableData.id,
          tableValues,
        },
      })
    } else {
      await insertTableData({
        variables: {
          assessmentId,
          pillarKey: pillar.key,
          criterionKey: criterion.key,
          partNumber,
          tableKey: tableDef.key,
          tableValues: [rowValues],
        },
      })
    }

    refetch()
  }

  async function handleDeleteTableRow(tableDef, rowIndex) {
    const tableData = getExistingTableData(
      assessmentData.assessment[0],
      tableDef
    )

    await deleteTableRow({
      variables: {
        id: tableData.id,
        rowIndex,
      },
    })

    refetch()
  }

  if (loading) {
    return 'Loading...'
  }

  if (error) {
    return 'Error'
  }

  return (
    <div className={classes.root}>
      <SEO title={criterion.name} />
      <PaddedContainer className={classes.paddedContainer}>
        <Button
          component={Link}
          to={`assessment/${assessment.key}`}
          variant="text"
          color="secondary"
        >
          ◀ Assessment overview
        </Button>
        <div className={classes.section}>
          <Grid container spacing={theme.spacing.unit * 4}>
            <Grid item>
              <SectionTitle barColor={pillarColor}>
                {pillar.name} <span style={{ color: pillarColor }}>▶</span>{' '}
                {criterion.name}
              </SectionTitle>
            </Grid>
          </Grid>
        </div>
        <div className={classes.section}>
          <Grid container spacing={theme.spacing.unit * 2} justify="flex-end">
            <Grid item>
              {previousLink ? (
                <Typography
                  color="secondary"
                  component={Link}
                  to={previousLink}
                  variant="body1"
                >
                  ❮
                </Typography>
              ) : (
                <Typography variant="body1" color="textSecondary">
                  ❮
                </Typography>
              )}
            </Grid>
            <Grid item>
              <Typography variant="body1">
                PART {partNumber} OF {totalParts}
              </Typography>
            </Grid>
            <Grid item>
              {nextLink ? (
                <Typography
                  variant="body1"
                  color="secondary"
                  component={Link}
                  to={nextLink}
                >
                  ❯
                </Typography>
              ) : (
                <Typography variant="body1" color="textSecondary">
                  ❯
                </Typography>
              )}
            </Grid>
          </Grid>
        </div>
        {part.tables.map(table => (
          <div key={table.key}>
            <Typography variant="h2" color="primary" gutterBottom>
              {table.name}
            </Typography>
            {createTableRows(assessmentData.assessment[0], table).map(
              (initialValues, rowIndex, { length: totalRows }) => (
                <div
                  className={classes.section}
                  key={`${table.key}-${rowIndex}`}
                >
                  <Formik
                    initialValues={initialValues}
                    onSubmit={(values, actions) =>
                      handleSaveTable(table, rowIndex, values, actions)
                    }
                  >
                    {({ isSubmitting, dirty }) => (
                      <Form>
                        <Grid container spacing={theme.spacing.unit * 2}>
                          {table.columns.map(column => (
                            <Grid item xs={4} key={column.key}>
                              <Typography variant="h3" gutterBottom>
                                {column.name}
                              </Typography>
                              <Field
                                component={TextField}
                                name={column.key}
                                fullWidth
                              />
                            </Grid>
                          ))}
                        </Grid>
                        <Grid
                          container
                          spacing={theme.spacing.unit * 2}
                          justify="flex-end"
                        >
                          <Grid item>
                            <Button
                              type="submit"
                              variant="contained"
                              color="secondary"
                              disabled={!dirty || isSubmitting}
                            >
                              {rowIndex === totalRows - 1
                                ? 'Save new row'
                                : 'Save Updates'}
                            </Button>
                          </Grid>
                          {rowIndex !== totalRows - 1 && (
                            <Grid item>
                              <Button
                                onClick={() =>
                                  handleDeleteTableRow(table, rowIndex)
                                }
                                variant="outlined"
                                color="secondary"
                              >
                                Remove
                              </Button>
                            </Grid>
                          )}
                        </Grid>
                      </Form>
                    )}
                  </Formik>
                </div>
              )
            )}
          </div>
        ))}
      </PaddedContainer>
      <div className={classes.scoringSection}>
        <PaddedContainer>
          <Typography variant="h2" color="primary" gutterBottom>
            Scoring Section
          </Typography>
          <AssessmentPartScoring
            assessment={assessment}
            assessmentPart={part}
            assessmentData={assessmentData}
            pillar={pillar}
            criterion={criterion}
            partNumber={partNumber}
            createNewAssessment={createNewAssessment}
            onScoreSaved={refetch}
          />
        </PaddedContainer>
      </div>
      <AssessmentProgress />
    </div>
  )
}

const styles = theme => ({
  root: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  paddedContainer: {
    flex: 1,
  },
  section: {
    margin: `${theme.spacing.unit * 3}px 0`,
  },
  scoringSection: {
    backgroundColor: theme.palette.background.light,
    padding: `${theme.spacing.unit * 3}px 0`,
  },
})

export default withStyles(styles, { withTheme: true })(CriterionPartTemplate)
