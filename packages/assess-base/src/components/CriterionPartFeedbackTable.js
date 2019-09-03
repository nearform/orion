import { useMutation } from 'graphql-hooks'
import React, { useState } from 'react'
import T from 'prop-types'
import { Grid, Button, Typography, withStyles } from '@material-ui/core'
import classnames from 'classnames'
import get from 'lodash/get'

import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-material-ui'

import ContextualHelp from '../components/ContextualHelp'
import {
  deleteAssessmentFeedbackRowMutation,
  insertAssessmentFeedbackDataMutation,
  updateAssessmentFeedbackDataMutation,
} from '../queries/assessments'

function getEmptyTableRow(tableDef) {
  return tableDef.columns.reduce(
    (initialValues, { key }) => ({ ...initialValues, [key]: '' }),
    {}
  )
}

function getExistingTableData(assessmentFeedbackTables, tableDef) {
  return (
    assessmentFeedbackTables &&
    assessmentFeedbackTables.find(({ table_key }) => table_key === tableDef.key)
  )
}

function getReturnedTableData(queryAction, result, tableId) {
  if (result.error) throw result.error
  const err = msg => {
    throw new Error(`Return from ${queryAction} ${msg}`)
  }

  const expectedProps = `data.${queryAction}.returning`
  const returning = get(result, expectedProps)

  if (!returning) err(`lacks properties ${expectedProps}`)

  const table = tableId
    ? returning.find(table => table.id === tableId)
    : returning[0]

  if (!table) err(`lacks table with id ${tableId}`)
  if (!table.feedback_values)
    err(`lacks .feedback_values on table id ${tableId}`)

  return table
}

function CriterionPartFeedbackTable({
  theme,
  classes,
  tableDef,
  assessmentFeedbackTables,
  assessmentId,
  pillarKey,
  criterionKey,
  partNumber,
  canEdit,
}) {
  const tableData = getExistingTableData(assessmentFeedbackTables, tableDef)
  const [tableId, setTableId] = useState(tableData ? tableData.id : null)
  const [tableRows, setTableRows] = useState(
    tableData ? tableData.feedback_values : []
  )

  const [insertTableData] = useMutation(insertAssessmentFeedbackDataMutation)
  const [updateTableData] = useMutation(updateAssessmentFeedbackDataMutation)
  const [deleteTableRow] = useMutation(deleteAssessmentFeedbackRowMutation)

  async function handleDeleteTableRow(rowIndex) {
    const result = await deleteTableRow({
      variables: {
        id: tableId,
        rowIndex,
      },
    })

    const { feedback_values: returnedRows } = getReturnedTableData(
      'update_assessment_feedback',
      result,
      tableId
    )
    setTableRows(returnedRows)
  }

  async function handleSaveTable(rowIndex, rowValues, { setSubmitting }) {
    if (tableId) {
      const modifiedRows = [...tableRows]
      modifiedRows[rowIndex] = rowValues

      const result = await updateTableData({
        variables: {
          id: tableId,
          feedbackValues: modifiedRows,
        },
      })
      // Ensure what was written to db and returned is what is shown
      const { feedback_values: returnedRows } = getReturnedTableData(
        'update_assessment_feedback',
        result,
        tableId
      )

      // Update this row only to not erase user's unsaved work on other rows
      modifiedRows[rowIndex] = returnedRows[rowIndex]

      setTableRows(modifiedRows)
      setSubmitting(false)
    } else {
      const result = await insertTableData({
        variables: {
          assessmentId,
          pillarKey,
          criterionKey,
          partNumber,
          tableKey: tableDef.key,
          feedbackValues: [rowValues],
        },
      })

      const { id, feedback_values: returnedRows } = getReturnedTableData(
        'insert_assessment_feedback',
        result,
        tableId
      )

      setTableId(id)
      setTableRows(returnedRows)
    }
  }

  let tables = [...tableRows]
  if (canEdit || !tables.length) {
    tables.push(getEmptyTableRow(tableDef))
  }
  const isDisabledAndEmpty = !canEdit && !tableRows.length

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item>
          <Typography variant="h2" color="primary" gutterBottom>
            {tableDef.name}
          </Typography>
        </Grid>
        {tableDef.guidance && (
          <Grid item>
            <ContextualHelp helpContent={tableDef.guidance}>
              <Button color="secondary">guidance</Button>
            </ContextualHelp>
          </Grid>
        )}
        <Grid item xs />
      </Grid>
      {tables.map((initialValues, rowIndex, { length: totalRows }) => (
        <Formik
          enableReinitialize
          initialValues={initialValues}
          onSubmit={(values, actions) =>
            handleSaveTable(rowIndex, values, actions)
          }
          key={`${tableDef.key}-${rowIndex}`}
        >
          {({ isSubmitting, dirty }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item container spacing={1} alignItems="baseline">
                  <Grid item>
                    <Grid container direction="column" alignItems="center">
                      <Grid item>
                        <Typography
                          variant="h4"
                          gutterBottom
                          className={classnames({
                            [classes.invisible]: rowIndex > 0,
                            [classes.disbledAndEmpty]: isDisabledAndEmpty,
                          })}
                        >
                          ITEM
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography
                          variant="h3"
                          color="primary"
                          className={classnames({
                            [classes.disbledAndEmpty]: isDisabledAndEmpty,
                          })}
                        >
                          {rowIndex + 1}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item container xs>
                    <Grid container direction="column">
                      {tableDef.columns.map(column => (
                        <div key={column.key}>
                          <Grid item className={classes.itemColumnName}>
                            <Typography
                              variant="h4"
                              gutterBottom
                              className={classnames({
                                [classes.invisible]: rowIndex > 0,
                                [classes.disbledAndEmpty]: isDisabledAndEmpty,
                              })}
                            >
                              {column.name}
                            </Typography>
                          </Grid>
                          <Grid
                            item
                            container
                            className={classnames(classes.itemBorder, {
                              [classes.itemBorderNew]:
                                rowIndex === totalRows - 1,
                              [classes.itemBorderExisting]:
                                rowIndex < totalRows - 1,
                              [classes.itemBorderDisabled]: isDisabledAndEmpty,
                            })}
                          >
                            <Grid container spacing={2} wrap="nowrap">
                              <Grid item xs>
                                <Field
                                  disabled={!canEdit}
                                  component={TextField}
                                  name={column.key}
                                  fullWidth
                                />
                              </Grid>
                              <Grid item xs={3}>
                                <Grid
                                  container
                                  spacing={2}
                                  justify="flex-end"
                                  wrap="nowrap"
                                >
                                  <Grid item>
                                    <Button
                                      type="submit"
                                      variant={
                                        canEdit ? 'contained' : 'outlined'
                                      }
                                      color="secondary"
                                      disabled={
                                        !canEdit || !dirty || isSubmitting
                                      }
                                    >
                                      {rowIndex === tableRows.length
                                        ? 'Save & add row'
                                        : 'Save Updates'}
                                    </Button>
                                  </Grid>
                                  {rowIndex !== tableRows.length && (
                                    <Grid item>
                                      <Button
                                        onClick={() =>
                                          handleDeleteTableRow(rowIndex)
                                        }
                                        variant="outlined"
                                        color="secondary"
                                        disabled={!canEdit}
                                      >
                                        Remove
                                      </Button>
                                    </Grid>
                                  )}
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </div>
                      ))}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      ))}
    </div>
  )
}

const styles = theme => ({
  invisible: {
    visibility: 'hidden',
    height: 0,
    marginBottom: 0,
  },
  itemColumnName: {
    paddingLeft: theme.spacing(2),
  },
  itemBorderNew: {
    borderLeft: `${theme.spacing(0.5)}px solid ${theme.palette.secondary.main}`,
  },
  itemBorderExisting: {
    borderLeft: `${theme.spacing(0.5)}px solid ${
      theme.palette.background.dark
    }`,
  },
  itemBorderDisabled: {
    borderLeft: `${theme.spacing(0.5)}px solid ${
      theme.palette.background.light
    }`,
  },
  itemBorder: {
    paddingLeft: theme.spacing(1),
  },
  disbledAndEmpty: {
    color: theme.palette.background.dark,
  },
})

CriterionPartFeedbackTable.propTypes = {
  theme: T.object.isRequired,
  classes: T.object.isRequired,
  tableDef: T.object.isRequired,
  assessmentFeedbackTables: T.array.isRequired,
  assessmentId: T.number.isRequired,
  partNumber: T.number.isRequired,
  criterionKey: T.string.isRequired,
  pillarKey: T.string.isRequired,
  canEdit: T.bool.isRequired,
}

export default withStyles(styles, { withTheme: true })(
  CriterionPartFeedbackTable
)
