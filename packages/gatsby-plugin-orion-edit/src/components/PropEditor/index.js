import React from 'react'
import { Checkbox, FormControl, Input, InputLabel } from '@material-ui/core'

export default function createPropEditor(componentProps) {
  const PropEditor = ({ props, onChange }) => {
    return Object.keys(componentProps).map(componentProp => {
      const { required, type } = componentProps[componentProp]
      const value = props[componentProp]

      let input = null

      if (type === 'boolean') {
        input = (
          <div>
            <Checkbox
              checked={value}
              onChange={event =>
                onChange({
                  ...props,
                  [componentProp]: event.target.checked,
                })
              }
            />
          </div>
        )
      }

      if (type === 'string') {
        input = (
          <Input
            multiline
            rowsMax={5}
            value={value}
            required={required}
            onChange={event =>
              onChange({
                ...props,
                [componentProp]: event.target.value,
              })
            }
          />
        )
      }

      if (type === 'number') {
        input = (
          <Input
            type="number"
            value={value}
            required={required}
            onChange={event =>
              onChange({
                ...props,
                [componentProp]: Number(event.target.value),
              })
            }
          />
        )
      }

      return (
        <div key={componentProp}>
          <FormControl fullWidth>
            <InputLabel shrink>{componentProp}</InputLabel>
            {input}
          </FormControl>
        </div>
      )
    })
  }

  return PropEditor
}
