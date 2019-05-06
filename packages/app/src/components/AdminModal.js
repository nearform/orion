import React from 'react'
import T from 'prop-types'
import { Formik, Form } from 'formik'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from '@material-ui/core'

function AdminModal({
  selected,
  data,
  contents,
  title,
  onSave,
  onClose,
  schema,
  getInitialValues,
}) {
  const isOpen = !!(selected && data)
  const initialValues = isOpen && getInitialValues(selected)
  return (
    <Dialog open={isOpen} onClose={onClose}>
      {title && selected && <DialogTitle>{title(selected)}</DialogTitle>}
      {isOpen && (
        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={onSave}
        >
          {({ isSubmitting, values, handleChange, isValid, dirty }) => {
            return (
              <Form>
                <DialogContent>
                  {contents.map(
                    ({ FieldComponent, entityKey, label }, index) => {
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
                    }
                  )}
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => onClose()} color="primary">
                    Cancel
                  </Button>
                  <Button
                    onClick={() => onSave(values)}
                    color="primary"
                    disabled={!isValid || isSubmitting || !dirty}
                  >
                    Apply
                  </Button>
                  )}
                </DialogActions>
              </Form>
            )
          }}
        </Formik>
      )}
    </Dialog>
  )
}

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

export default AdminModal
