import React from 'react'

const RichText = ({ value }) => (
  <div className="ck-content" dangerouslySetInnerHTML={{ __html: value }} />
)

export default RichText
