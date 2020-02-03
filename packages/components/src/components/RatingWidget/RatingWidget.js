import React, { useState, useEffect } from 'react'
import T from 'prop-types'
import { withStyles, Typography } from '@material-ui/core'
import Star from './Star'

const RatingWidget = ({
  rating,
  count,
  userRating: userRatingProp,
  disabled: disabledProp,
  onRate = () => {},
  classes,
}) => {
  const [rateMode, setRateMode] = useState(false)
  const [userRating, setUserRating] = useState(0)
  const disabled = disabledProp || Boolean(userRatingProp)

  const onMouseEnter = () => setRateMode(true)
  const onMouseLeave = () => setRateMode(false)

  useEffect(() => {
    setUserRating(userRatingProp)
  }, [userRatingProp])

  return (
    <div className={classes.wrapper}>
      <span className={classes.rating}>{rating.toFixed(1)}</span>
      <div
        className={classes.ratingContainer}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {[1, 2, 3, 4, 5].map(val => (
          <Star
            key={val}
            filled={rateMode ? val <= userRating : val <= Math.round(rating)}
            active={rateMode}
            disabled={disabled}
            onHover={() => setUserRating(val)}
            onClick={() => onRate(userRating)}
          />
        ))}

        <Typography variant="h4" className={classes.text}>
          {(rateMode && 'Your rating') ||
            (!userRatingProp && 'Rate this article') ||
            `${count} ${count === 1 ? 'rating' : 'ratings'}`}
        </Typography>
      </div>
    </div>
  )
}

RatingWidget.propTypes = {
  rating: T.number.isRequired,
  count: T.number.isRequired,
  userRating: T.number,
  disabled: T.bool,
  classes: T.object.isRequired,
  onRate: T.func,
}

export default withStyles(theme => ({
  wrapper: {
    display: 'flex',
  },
  rating: {
    fontSize: 24,
    fontWeight: 700,
    color: theme.iconLight.color,
  },
  ratingContainer: {
    flexGrow: 1,
    paddingLeft: theme.spacing(2),
    paddingTop: theme.spacing(1),
  },
  text: {
    color: theme.articleWidgetColor,
  },
  progressWrapper: {
    paddingLeft: theme.spacing(2),
  },
}))(RatingWidget)
