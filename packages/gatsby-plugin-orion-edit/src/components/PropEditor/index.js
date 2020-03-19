import React, { useCallback } from 'react'
import MarkdownEditor from '../MarkdownEditor/MarkdownEditor'
import CloudinaryImageChooser from 'gatsby-plugin-orion-core/src/components/CloudinaryMediaLibrary'
import getCloudinarySignature from 'gatsby-plugin-orion-core/src/utils/cloudinary-signature-from-auth'
import {
  FormControl,
  Input,
  InputBase,
  InputLabel,
  MenuItem,
  Select,
  makeStyles,
  Paper,
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  input: {
    marginBottom: theme.spacing(1),
  },
  imageInputPaper: {
    display: 'flex',
    marginTop: 16,
    paddingBottom: 8.5,
    paddingTop: 7.5,
    paddingLeft: 12,
    border: 'solid 1px',
    borderColor: theme.palette.tertiary.main,
    backgroundColor: theme.palette.background.dark,
    boxShadow: 'none',
  },
  imageInputBase: {
    fontSize: 12,
    flex: 1,
  },
}))

export default function createPropEditor(componentProps) {
  const PropEditor = ({ page, props, onChange }) => {
    const classes = useStyles()

    const handleChange = useCallback(
      (prop, value) => {
        onChange({ ...props, [prop]: value }, page)
      },
      [onChange, page, props]
    )

    return Object.keys(componentProps).map(componentProp => {
      const { label, options, required, type } = componentProps[componentProp]
      const value = props[componentProp]

      let input = null

      if (type === 'boolean') {
        input = (
          <Select
            value={value}
            onChange={event => handleChange(componentProp, event.target.value)}
          >
            <MenuItem value>Yes</MenuItem>
            <MenuItem value={false}>No</MenuItem>
          </Select>
        )
      }

      if (type === 'string') {
        input = (
          <Input
            value={value}
            required={required}
            onChange={event => {
              handleChange(componentProp, event.target.value)
            }}
          />
        )
      }

      if (type === 'image') {
        input = (
          <Paper className={classes.imageInputPaper}>
            <InputBase
              className={classes.imageInputBase}
              value={value}
              required={required}
              onChange={event => {
                handleChange(componentProp, event.target.value)
              }}
            />
            <CloudinaryImageChooser
              cloudinaryApiKey={process.env.GATSBY_CLOUDINARY_API_KEY}
              cloudinaryCloudName={process.env.GATSBY_CLOUDINARY_CLOUD_NAME}
              cloudinaryUsername={process.env.GATSBY_CLOUDINARY_USERNAME}
              getCloudinarySignature={getCloudinarySignature}
              onInsertedImage={imgUrl => handleChange(componentProp, imgUrl)}
            />
          </Paper>
        )
      }

      if (type === 'number') {
        input = (
          <Input
            type="number"
            value={value}
            required={required}
            onChange={event => {
              handleChange(componentProp, Number(event.target.value))
            }}
          />
        )
      }

      if (type === 'markdown') {
        input = (
          <MarkdownEditor
            content={value}
            onChange={value => {
              handleChange(componentProp, value)
            }}
          />
        )
      }

      if (type === 'select') {
        input = (
          <Select
            value={value}
            onChange={event => handleChange(componentProp, event.target.value)}
          >
            {options.map(option => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        )
      }

      return (
        <div key={componentProp}>
          <FormControl fullWidth className={classes.input}>
            <InputLabel shrink>{label || componentProp}</InputLabel>
            {input}
          </FormControl>
        </div>
      )
    })
  }

  return PropEditor
}
