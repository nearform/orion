import React from 'react'
const materialUi = jest.requireActual('@material-ui/core')

module.exports = {
  ...materialUi,
  Button: jest.fn(props =>
    props.component ? (
      <a href={props.to}>{props.children}</a>
    ) : (
      <button type="button" {...props}>
        {props.children}
      </button>
    )
  ),
}
