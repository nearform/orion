import React, { useState } from 'react'
import T from 'prop-types'

import { storiesOf } from '@storybook/react'
import { jsxDecorator } from 'storybook-addon-jsx'

import RatingWidget from './RatingWidget'

const Rating = ({ ratings: ratingsProp, userRating, disabled }) => {
  const [ratings, setRatings] = useState(ratingsProp)

  return (
    <RatingWidget
      rating={ratings.reduce((a, b) => a + b, 0) / ratings.length || 0}
      count={ratings.length}
      userRating={userRating}
      disabled={disabled}
      onRate={rating => setRatings(ratings => [...ratings, rating])}
    />
  )
}

Rating.propTypes = {
  ratings: T.arrayOf(T.number).isRequired,
  userRating: T.number,
  disabled: T.bool,
}

storiesOf('RatingWidget', module)
  .addDecorator(jsxDecorator)
  .add('without ratings', () => <Rating ratings={[]} />)
  .add('with ratings', () => <Rating ratings={[1, 2, 2, 3, 5]} />)
  .add('with user rating', () => (
    <Rating ratings={[1, 2, 2, 3, 5]} userRating={3} />
  ))
  .add('disabled', () => <Rating disabled ratings={[1, 2, 2, 3, 5]} />)
