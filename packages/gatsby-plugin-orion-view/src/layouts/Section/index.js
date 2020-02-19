import React from 'react'

function SectionLayout({ main, page }) {
  return (
    <div>
      <h1>
        {page.title}
      </h1>
      <div>
        {main}
      </div>
    </div>
  )
}

export default SectionLayout
