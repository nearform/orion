import React, { useState } from 'react'
import { Grid, Button, Typography, withStyles } from '@material-ui/core'
import { useMutation } from 'graphql-hooks'
import get from 'lodash/get'

import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-material-ui'

import {
  insertAssessmentTableDataMutation,
  updateAssessmentTableDataMutation,
  deleteAssessmentTableRowMutation,
} from '../queries'

import ContextualHelp from '../components/ContextualHelp'

function getEmptyTableRow(tableDef) {
  return tableDef.columns.reduce(
    (initialValues, { key }) => ({ ...initialValues, [key]: '' }),
    {}
  )
}

function getExistingTableData(assessmentTables, tableDef) {
  return (
    assessmentTables &&
    assessmentTables.find(({ table_key }) => table_key === tableDef.key)
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
  if (!table.table_values) err(`lacks .table_values on table id ${tableId}`)

  return table
}

function CriterionPartTable({
  theme,
  classes,
  key,
  table: tableDef,
  assessmentTables,
  assessmentId,
  partNumber,
  criterionKey,
  pillarKey,
}) {
  const tableData = getExistingTableData(assessmentTables, tableDef)

  const [tableId, setTableId] = useState(tableData ? tableData.id : null)
  const [tableRows, setTableRows] = useState(
    tableData ? tableData.table_values : []
  )

  const [insertTableData] = useMutation(insertAssessmentTableDataMutation)
  const [updateTableData] = useMutation(updateAssessmentTableDataMutation)
  const [deleteTableRow] = useMutation(deleteAssessmentTableRowMutation)

  async function handleDeleteTableRow(rowIndex) {
    const result = await deleteTableRow({
      variables: {
        id: tableId,
        rowIndex,
      },
    })

    const { table_values: returnedRows } = getReturnedTableData(
      'update_assessment_table',
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
          tableValues: modifiedRows,
        },
      })
      // Ensure what was written to db and returned is what is shown
      const { table_values: returnedRows } = getReturnedTableData(
        'update_assessment_table',
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
          tableValues: [rowValues],
        },
      })

      const { id, table_values: returnedRows } = getReturnedTableData(
        'insert_assessment_table',
        result,
        tableId
      )

      setTableId(id)
      setTableRows(returnedRows)
    }
  }

  return (
    <div key={key}>
      <Typography variant="h2" color="primary" gutterBottom>
        {tableDef.name}
        {tableDef.guidance && (
          <ContextualHelp helpContent={tableDef.guidance}>
            <Button color="secondary">guidance</Button>
          </ContextualHelp>
        )}
      </Typography>
      {[...tableRows, getEmptyTableRow(tableDef)].map(
        (initialValues, rowIndex) => (
          <div className={classes.section} key={`${tableDef.key}-${rowIndex}`}>
            <Formik
              enableReinitialize
              initialValues={initialValues}
              onSubmit={(values, actions) =>
                handleSaveTable(rowIndex, values, actions)
              }
            >
              {({ isSubmitting, dirty }) => (
                <Form>
                  <Grid container spacing={theme.spacing.unit * 2}>
                    {tableDef.columns.map(column => (
                      <Grid item xs={4} key={column.key}>
                        <Typography variant="h4" gutterBottom>
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
                        {rowIndex === tableRows.length
                          ? 'Save new row'
                          : 'Save Updates'}
                      </Button>
                    </Grid>
                    {rowIndex !== tableRows.length && (
                      <Grid item>
                        <Button
                          onClick={() => handleDeleteTableRow(rowIndex)}
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
  )
}

const styles = theme => ({
  section: {
    margin: `${theme.spacing.unit * 3}px 0`,
  },
})

export default withStyles(styles, { withTheme: true })(CriterionPartTable)
