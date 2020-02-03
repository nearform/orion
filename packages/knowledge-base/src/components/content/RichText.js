import React from 'react'

/* eslint-disable react/no-danger */
const RichText = ({ value }) => (
  <div dangerouslySetInnerHTML={{ __html: value }} className="ck-content" />
)
/* eslint-enable react/no-danger */

export default RichText
