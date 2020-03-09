import React from 'react'
import {
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  makeStyles,
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  input: {
    marginBottom: theme.spacing(1),
  },
}))

export default function createPropEditor(componentProps) {
  const PropEditor = ({ props, onChange }) => {
    const classes = useStyles()

    return Object.keys(componentProps).map(componentProp => {
      const { required, type } = componentProps[componentProp]
      const value = props[componentProp]

      let input = null

      if (type === 'boolean') {
        input = (
          <Select
            value={value}
            onChange={event =>
              onChange({
                ...props,
                [componentProp]: event.target.value,
              })
            }
          >
            <MenuItem value>Yes</MenuItem>
            <MenuItem value={false}>No</MenuItem>
          </Select>
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
          <FormControl fullWidth className={classes.input}>
            <InputLabel shrink>{componentProp}</InputLabel>
            {input}
          </FormControl>
        </div>
      )
    })
  }

  return PropEditor
}
