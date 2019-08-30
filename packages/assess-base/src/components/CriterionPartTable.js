import React, { useState } from 'react'
import T from 'prop-types'
import { Grid, Button, Typography, withStyles } from '@material-ui/core'
import { useMutation } from 'graphql-hooks'
import get from 'lodash/get'
import classnames from 'classnames'

import { Formik, Form } from 'formik'

import {
  insertAssessmentTableDataMutation,
  updateAssessmentTableDataMutation,
  deleteAssessmentTableRowMutation,
} from '../queries'

import CriterionPartInput from '../components/CriterionPartInput'
import CriterionPartHeader from '../components/CriterionPartHeader'

function getEmptyTableRow(columnsDef) {
  return columnsDef.reduce(
    (initialValues, { key, type }) => ({
      ...initialValues,
      [key]: type === 'link' ? [] : '',
    }),
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
  tableDef,
  columnsDef,
  assessmentTables,
  assessmentId,
  partNumber,
  criterionKey,
  pillarKey,
  canEdit,
  paginationNode,
  criteriaList,
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

  let tables = [...tableRows]

  if (canEdit) {
    tables.push(getEmptyTableRow(columnsDef))
  }

  return (
    <div>
      <CriterionPartHeader
        helpContent={tableDef.guidance}
        title={tableDef.name}
        paginationNode={paginationNode}
        buttonLabel="guidance"
      />
      {tables.map((initialValues, rowIndex, { length: totalRows }) => {
        const tableKey = `${tableDef.key}-${rowIndex}`
        return (
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values, actions) =>
              handleSaveTable(rowIndex, values, actions)
            }
            key={tableKey}
          >
            {({ isSubmitting, dirty, values }) => (
              <Form className={classes.section}>
                <Grid container direction="column" spacing={2}>
                  <Grid item container spacing={1} wrap="nowrap">
                    <Grid item>
                      <Grid container direction="column" alignItems="center">
                        <Grid item>
                          <Typography
                            variant="h4"
                            gutterBottom
                            className={classnames({
                              invisible: rowIndex > 0,
                            })}
                          >
                            ITEM
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant="h3" color="primary">
                            {rowIndex + 1}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Grid
                        container
                        className={classes.itemBorderContainer}
                        direction="column"
                        alignItems="center"
                      >
                        <Grid item>
                          <Typography
                            variant="h4"
                            gutterBottom
                            className={classes.invisible}
                          >
                            {rowIndex}
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          className={classnames(classes.itemBorder, {
                            [classes.itemBorderActive]:
                              rowIndex === totalRows - 1,
                          })}
                        >
                          &nbsp;
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs>
                      <Grid container spacing={2}>
                        {columnsDef.map(column => {
                          const inputKey = `${tableKey}-${column.key}`
                          return (
                            <CriterionPartInput
                              key={inputKey}
                              inputKey={inputKey}
                              column={column}
                              values={values}
                              canEdit={canEdit}
                              criteriaList={criteriaList}
                              assessmentId={assessmentId}
                            />
                          )
                        })}
                      </Grid>
                    </Grid>
                  </Grid>
                  {canEdit && (
                    <Grid item container spacing={2} justify="flex-end">
                      <Grid item>
                        <Button
                          type="submit"
                          variant="contained"
                          color="secondary"
                          disabled={!dirty || isSubmitting}
                        >
                          {rowIndex === tableRows.length
                            ? 'Save & add row'
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
                  )}
                </Grid>
              </Form>
            )}
          </Formik>
        )
      })}
    </div>
  )
}

CriterionPartTable.propTypes = {
  theme: T.object.isRequired,
  classes: T.object.isRequired,
  tableDef: T.object.isRequired,
  assessmentTables: T.array.isRequired,
  assessmentId: T.number.isRequired,
  partNumber: T.number.isRequired,
  criterionKey: T.string.isRequired,
  pillarKey: T.string.isRequired,
  paginationNode: T.node,
  canEdit: T.bool.isRequired,
}
const styles = theme => ({
  section: {
    margin: theme.spacing(3, 0),
  },
  invisible: {
    visibility: 'hidden',
  },
  itemBorderContainer: {
    height: '100%',
  },
  itemBorder: {
    width: theme.spacing(0.5),
    backgroundColor: theme.palette.background.dark,
    flex: 1,
  },
  itemBorderActive: {
    backgroundColor: theme.palette.secondary.main,
  },
})

export default withStyles(styles, { withTheme: true })(CriterionPartTable)
