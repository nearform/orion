import React from 'react'

const RichText = ({ value }) => (
  <div dangerouslySetInnerHTML={{ __html: value }} />
)

export default RichText
