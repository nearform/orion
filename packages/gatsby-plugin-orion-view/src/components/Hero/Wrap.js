import React from 'react'
import Hero from '.'
import SearchInput from 'gatsby-plugin-orion-core/src/components/SearchInput'

export default function({ image, subtitle, title }) {
  return (
    <Hero
      imageSrc={image}
      subtitle={subtitle}
      title={title}
      searchInput={<SearchInput placeholderText="Search Acme" />}
    />
  )
}
