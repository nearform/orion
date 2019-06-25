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
    <Dialog open={true} onClose={onClose}>
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
        {({ isSubmitting, values, handleChange, isValid, dirty }) => {
          return (
            <Form>
              <DialogContent>
                {contents.map(({ FieldComponent, entityKey, label }, index) => {
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
                    />
                  )
                })}
              </DialogContent>
              <DialogActions className={classes.modalButtons}>
                <Button
                  onClick={() => onClose()}
                  color="secondary"
                  variant="outlined"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => onSave(values)}
                  color="secondary"
                  variant="outlined"
                  disabled={!isValid || isSubmitting || !dirty}
                >
                  Apply
                </Button>
              </DialogActions>
            </Form>
          )
        }}
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
  selected: T.any,
  data: T.object,
  contents: T.array.isRequired,
  title: T.func,
  onSave: T.func.isRequired,
  onClose: T.func.isRequired,
  schema: T.object,
  getInitialValues: T.func.isRequired,
}

export default withStyles(styles)(AdminModal)
