import React, { useState } from 'react'
import T from 'prop-types'
import { navigate } from 'gatsby'
import { SectionTitle, ASSESSMENT_STATUS, NavLink } from 'components'
import { Grid, Button, withStyles } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'graphql-hooks'
import get from 'lodash/get'

import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-material-ui'

import {
  insertAssessmentTableDataMutation,
  updateAssessmentTableDataMutation,
  updateAssessmentStatusMutation,
} from '../queries'

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

function QuestionnaireBackgroundInfo({
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
  pillarColor,
  nextLink,
  isFinalCriteria,
}) {
  const { t } = useTranslation()
  const tableData = getExistingTableData(assessmentTables, tableDef)

  const [tableId, setTableId] = useState(tableData ? tableData.id : null)
  const [tableRows, setTableRows] = useState(
    tableData ? tableData.table_values : []
  )

  const [insertTableData] = useMutation(insertAssessmentTableDataMutation)
  const [updateTableData] = useMutation(updateAssessmentTableDataMutation)
  const [updateAssessmentStatus] = useMutation(updateAssessmentStatusMutation)

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

  async function handleSubmitAssessment() {
    await updateAssessmentStatus({
      variables: {
        id: assessmentId,
        status: ASSESSMENT_STATUS.submitted,
      },
    })

    navigate(nextLink + `#${assessmentId}`)
  }

  let tables = [...tableRows]

  if (canEdit || !tables.length) {
    tables.push(getEmptyTableRow(columnsDef))
  }

  const [table] = tables
  const [column] = columnsDef

  return (
    <Grid container className={classes.root}>
      <Grid item xs={3} className={classes.titleGrid}>
        <SectionTitle barColor={theme.palette.secondary.main}>
          {tableDef.name}
        </SectionTitle>
      </Grid>
      <Grid item xs={9}>
        <Formik
          enableReinitialize
          initialValues={table}
          onSubmit={(values, actions) => handleSaveTable(0, values, actions)}
          key={tableDef.key}
        >
          {({ isSubmitting, dirty, values, setFieldValue }) => (
            <Form className={classes.section}>
              <Grid container direction="column" spacing={2}>
                <Grid item container wrap="nowrap">
                  <Grid item xs>
                    <Grid container alignItems="flex-end">
                      <Field
                        id={`${tableDef.key}-${column.key}`}
                        key={column.key}
                        disabled={!canEdit}
                        component={TextField}
                        name={column.key}
                        className={classes.input}
                        fullWidth
                        multiline={true}
                        InputProps={{
                          style: {
                            'min-height': '184px',
                            alignItems: 'flex-start',
                          },
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                {canEdit && (
                  <Grid item container spacing={2} justify="flex-end">
                    <Grid item>
                      <Button
                        type="submit"
                        variant={canEdit ? 'contained' : 'outlined'}
                        color="secondary"
                        disabled={!canEdit || !dirty || isSubmitting}
                        className={classes.saveButton}
                      >
                        {t('Save Updates')}
                      </Button>
                      {isFinalCriteria ? (
                        <Button
                          variant="outlined"
                          color="secondary"
                          onClick={handleSubmitAssessment}
                        >
                          {t('Submit Assessment')}
                        </Button>
                      ) : (
                        <Button
                          component={NavLink}
                          variant="outlined"
                          color="secondary"
                          to={`${nextLink}#${assessmentId}`}
                        >
                          {t('Next Criteria')}
                        </Button>
                      )}
                    </Grid>
                  </Grid>
                )}
              </Grid>
            </Form>
          )}
        </Formik>
      </Grid>
    </Grid>
  )
}

QuestionnaireBackgroundInfo.propTypes = {
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
  nextLink: T.string.isRequired,
  isFinalCriteria: T.bool.isRequired,
}
const styles = theme => ({
  root: {
    marginTop: theme.spacing(7),
  },
  titleGrid: {
    marginTop: theme.spacing(3.25),
  },
  section: {
    margin: theme.spacing(3, 0),
  },
  disabledAndEmpty: {
    color: theme.palette.background.dark,
  },
  input: {
    marginLeft: theme.spacing(3),
  },
  saveButton: {
    marginRight: theme.spacing(3),
  },
})

export default withStyles(styles, { withTheme: true })(
  QuestionnaireBackgroundInfo
)
