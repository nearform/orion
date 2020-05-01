import React from 'react'
import PropTypes from 'prop-types'
import { DateTimePicker } from '@material-ui/pickers'

const ArticleDatePicker = ({ dialogPropsClassName, ...props }) => (
  <DateTimePicker
    autoOk
    ampm={false}
    DialogProps={{
      className: dialogPropsClassName,
    }}
    format="MMM dd yyyy, hh:mm a"
    variant="dialog"
    orientation="portrait"
    {...props}
  />
)

ArticleDatePicker.propTypes = {
  dialogPropsClassName: PropTypes.string,
}
ArticleDatePicker.defaultProps = {
  dialogPropsClassName: '',
}

export default ArticleDatePicker
