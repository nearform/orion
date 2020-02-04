import React from 'react'
import T from 'prop-types'
import { Formik, Form } from 'formik'
import {
  withStyles,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@material-ui/core'

function AdminModal({
  classes,
  selected,
  data,
  contents,
  getTitleParts,
  onSave,
  onClose,
  schema,
  getInitialValues,
}) {
  if (!selected || !data) return ''

  const initialValues = getInitialValues(selected)
  const [titleAction, titleTarget] = getTitleParts(selected)

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle disableTypography className={classes.modalTitle}>
        <Typography variant="h4" className={classes.titleLabel}>
          {titleAction}
        </Typography>
        <Typography variant="body2">{titleTarget}</Typography>
      </DialogTitle>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={onSave}
      >
        {({ isSubmitting, values, handleChange, isValid, dirty }) => (
          <Form>
            <DialogContent>
              {contents.map(
                ({ FieldComponent, entityKey, label, emptyLabel }, index) => {
                  const key = `${FieldComponent.name}_${index}`
                  return (
                    <FieldComponent
                      key={key}
                      values={values}
                      handleChange={handleChange}
                      selected={selected}
                      data={data}
                      label={label}
                      entityKey={entityKey}
                      emptyLabel={emptyLabel}
                    />
                  )
                }
              )}
            </DialogContent>
            <DialogActions className={classes.modalButtons}>
              <Button
                color="secondary"
                variant="outlined"
                onClick={() => onClose()}
              >
                Cancel
              </Button>
              <Button
                color="secondary"
                variant="outlined"
                disabled={!isValid || isSubmitting || !dirty}
                onClick={() => onSave(values, selected)}
              >
                Apply
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  )
}

const styles = theme => ({
  modalTitle: {
    minWidth: theme.spacing(40),
    paddingBottom: 0,
  },
  titleLabel: {
    color: theme.palette.primary.dark,
    fontWeight: 700,
    margin: theme.spacing(1, 0, 0.5),
  },
  modalButtons: {
    margin: theme.spacing(0, 2, 2),
  },
})

AdminModal.propTypes = {
  classes: T.object.isRequired,
  selected: T.any,
  data: T.object,
  contents: T.array.isRequired,
  onSave: T.func.isRequired,
  onClose: T.func.isRequired,
  schema: T.object,
  getTitleParts: T.func.isRequired,
  getInitialValues: T.func.isRequired,
}

export default withStyles(styles)(AdminModal)
