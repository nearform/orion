import React from 'react'
import PropTypes from 'prop-types'

const MenuCard = ({ text, src }) => (
  <li>
    <img src={src} alt={`Menu icon for ${text}`} />
    <span>{text}</span>
  </li>
)

MenuCard.propTypes = {
  text: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
}

export default MenuCard
