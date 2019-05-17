import React from 'react'
import { Grid, Button, Typography, withStyles } from '@material-ui/core'
import { PaddedContainer } from 'components'
import { Link } from 'gatsby'
import { useQuery, useMutation } from 'graphql-hooks'
import { Redirect } from '@reach/router'
import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-material-ui'

import SEO from '../components/seo'
import SectionTitle from '../components/SectionTitle'
import {
  getAssessmentPartData,
  insertAssessmentTableDataMutation,
  updateAssessmentTableDataMutation,
  deleteAssessmentTableRowMutation,
  createFileUploadMutation,
} from '../queries'
import { isAuthenticatedSync, getUserIdSync } from '../utils/auth'
import { uploadFile, downloadFile } from '../utils/storage'
import AssessmentPillarScoring from '../components/AssessmentPillarScoring'
import UploadButton from '../components/UploadButton'
import { getAssessmentId } from '../utils/url'
import ContextualHelp from '../components/ContextualHelp'

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
  location,
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
    guidance,
  },
}) {
  if (!isAuthenticatedSync()) {
    return <Redirect to="/auth" noThrow />
  }

  const userId = getUserIdSync()
  const assessmentId = getAssessmentId(location)

  const [insertTableData] = useMutation(insertAssessmentTableDataMutation)
  const [updateTableData] = useMutation(updateAssessmentTableDataMutation)
  const [deleteTableRow] = useMutation(deleteAssessmentTableRowMutation)
  const [createFileUpload] = useMutation(createFileUploadMutation)

  const {
    loading,
    error,
    data: { assessment_by_pk: assessmentData } = { assessment_by_pk: null },
    refetch,
  } = useQuery(getAssessmentPartData, {
    variables: {
      id: assessmentId,
      pillarKey: pillar.key,
      criterionKey: criterion.key,
      partNumber,
    },
  })

  async function createNewFileUpload(assessmentId, fileName, s3Key) {
    const { data, error } = await createFileUpload({
      variables: {
        fileUploadData: {
          user_id: userId,
          assessment_id: assessmentId,
          part_number: partNumber,
          file_name: fileName,
          s3_key: s3Key,
        },
      },
    })

    if (error) throw error

    return data.insert_assessment_file.returning[0].id
  }

  async function handleSaveTable(tableDef, rowIndex, rowValues) {
    const tableData = getExistingTableData(assessmentData, tableDef)

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
    const tableData = getExistingTableData(assessmentData, tableDef)

    await deleteTableRow({
      variables: {
        id: tableData.id,
        rowIndex,
      },
    })

    refetch()
  }

  async function handleFileUpload(file) {
    const { key: s3Key } = await uploadFile(file, assessmentId)
    await createNewFileUpload(assessmentId, file.name, s3Key)

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
        <Grid container spacing={theme.spacing.unit * 2}>
          <Grid item>
            <Button
              component={Link}
              to={`assessment/${assessment.key}#${assessmentId}`}
              variant="text"
              color="secondary"
            >
              ◀ Assessment overview
            </Button>
          </Grid>
          <Grid container item direction="column">
            <Grid item container>
              <Grid item>
                <Typography variant="h4" color="textSecondary">
                  Supporting documentation
                </Typography>
              </Grid>
              <Grid item container spacing={theme.spacing.unit}>
                {assessmentData.files.map(file => (
                  <Grid item key={file.s3_key}>
                    <Button variant="text" onClick={_ => downloadFile(file)}>
                      {file.file_name}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <UploadButton
              onFileSelected={handleFileUpload}
              color="secondary"
              variant="outlined"
            >
              Upload
            </UploadButton>
          </Grid>
        </Grid>
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
                  to={`${previousLink}#${assessmentId}`}
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
                  to={`${nextLink}#${assessmentId}`}
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
              {table.guidance && (
                <ContextualHelp helpContent={table.guidance}>
                  <Button color="secondary">guidance</Button>
                </ContextualHelp>
              )}
            </Typography>
            {createTableRows(assessmentData, table).map(
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
          <AssessmentPillarScoring
            assessmentId={assessmentId}
            assessment={assessment}
            assessmentData={assessmentData}
            pillar={pillar}
            criterion={criterion}
            partNumber={partNumber}
            onScoreSaved={refetch}
          />
        </PaddedContainer>
      </div>
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

    // Work around MUI 3.x sliders bug causing viewport overflow
    // see https://github.com/mui-org/material-ui/issues/13455
    overflow: 'hidden',
  },
})

export default withStyles(styles, { withTheme: true })(CriterionPartTemplate)
