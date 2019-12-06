import React from 'react'
const materialUi = jest.requireActual('@material-ui/core')

module.exports = {
  ...materialUi,
  // Mocking Button and IconButton prevents warnings when passing a Link component to them
  Button: jest.fn(props =>
    props.component ? (
      <a href={props.to}>{props.children}</a>
    ) : (
      <button {...props}>{props.children}</button>
    )
  ),
  IconButton: jest.fn(props =>
    props.component ? (
      <a href={props.to}>{props.children}</a>
    ) : (
      <button {...props}>{props.children}</button>
    )
  ),
}
