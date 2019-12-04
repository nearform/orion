import React from 'react'

export default ({ title, subTitle, mdContent }) => (
  <div data-testid="content-modal">
    <h4>{title}</h4>
    <h5>{subTitle}</h5>
    <div>{mdContent}</div>
  </div>
)
