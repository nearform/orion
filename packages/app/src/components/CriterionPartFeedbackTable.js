import React, { useState } from 'react'
import T from 'prop-types'
import { Grid, Button, Typography, withStyles } from '@material-ui/core'
import classnames from 'classnames'

import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-material-ui'

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

function CriterionPartFeedbackTable({
  theme,
  classes,
  tableDef,
  assessmentTables,
  disableEditing,
}) {
  const tableData = getExistingTableData(assessmentTables, tableDef)

  // TODO remove eslint disables after implementing https://github.com/nearform/raw-salmon/issues/232
  // eslint-disable-next-line
  const [tableId, setTableId] = useState(tableData ? tableData.id : null)
  // eslint-disable-next-line
  const [tableRows, setTableRows] = useState(
    tableData ? tableData.table_values : []
  )

  async function handleDeleteTableRow(rowIndex) {
    //TBD
  }

  async function handleSaveTable(rowIndex, rowValues, { setSubmitting }) {
    //TBD
  }

  return (
    <div>
      <Grid container spacing={theme.spacing.unit * 2}>
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
      {[...tableRows, getEmptyTableRow(tableDef)].map(
        (initialValues, rowIndex, { length: totalRows }) => (
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
                <Grid container spacing={theme.spacing.unit * 2}>
                  <Grid
                    item
                    container
                    spacing={theme.spacing.unit}
                    alignItems="baseline"
                  >
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
                    <Grid item container xs>
                      <Grid container direction="column">
                        {tableDef.columns.map(column => (
                          <div key={column.key}>
                            <Grid item className={classes.itemColumnName}>
                              <Typography variant="h4" gutterBottom>
                                {column.name}
                              </Typography>
                            </Grid>
                            <Grid item>
                              <Grid container>
                                <Grid item xs className={classes.itemBorder}>
                                  <Field
                                    disabled={disableEditing}
                                    component={TextField}
                                    name={column.key}
                                    fullWidth
                                  />
                                </Grid>
                                {!disableEditing && (
                                  <Grid item>
                                    <Grid
                                      container
                                      spacing={theme.spacing.unit * 2}
                                    >
                                      <Grid item>
                                        <Button
                                          type="submit"
                                          variant="contained"
                                          color="secondary"
                                          disabled={!dirty || isSubmitting}
                                        >
                                          {rowIndex === totalRows
                                            ? 'Save new row'
                                            : 'Save Updates'}
                                        </Button>
                                      </Grid>
                                      <Grid item>
                                        <Button
                                          disabled={rowIndex !== totalRows}
                                          onClick={() =>
                                            handleDeleteTableRow(rowIndex)
                                          }
                                          variant="outlined"
                                          color="secondary"
                                        >
                                          Remove
                                        </Button>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                )}
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
        )
      )}
    </div>
  )
}

const styles = theme => ({
  invisible: {
    visibility: 'hidden',
  },
  itemColumnName: {
    paddingLeft: theme.spacing.unit * 2,
  },
  itemBorder: {
    paddingLeft: theme.spacing.unit,
    borderLeft: `${theme.spacing.unit / 2}px solid ${
      theme.palette.secondary.main
    }`,
  },
})

CriterionPartFeedbackTable.propTypes = {
  theme: T.object.isRequired,
  classes: T.object.isRequired,
  tableDef: T.object.isRequired,
  assessmentTables: T.arrayOf(T.object),
  disableEditing: T.bool.isRequired,
}

export default withStyles(styles, { withTheme: true })(
  CriterionPartFeedbackTable
)
