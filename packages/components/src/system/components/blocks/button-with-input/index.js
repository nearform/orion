import React from 'react'
import PropTypes from 'prop-types'

import Button from '~/system/components/elements/button/index'
import Input from '~/system/components/elements/input/index'

const ButtonWithInput = ({ button, input }) => (
  <div>
    <Input onChange={input.onChange} placeholder={'Input your email'} />
    <Button onClick={button.onClick}>Hello World button with input</Button>
  </div>
)

ButtonWithInput.propTypes = {
  button: PropTypes.shape(Button.propTypes),
  input: PropTypes.shape(Input.propTypes),
}

export default ButtonWithInput
