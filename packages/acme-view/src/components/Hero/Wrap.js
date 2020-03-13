import React from 'react'
import Hero from '.'

export default function({ image, subtitle, title }) {
  return (
    <Hero
      imageSrc={image}
      subtitle={subtitle}
      title={title}
      onSearch={() => {}}
    />
  )
}
