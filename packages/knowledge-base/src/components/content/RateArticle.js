import React, { useEffect } from 'react'
import { useManualQuery, useMutation } from 'graphql-hooks'
import T from 'prop-types'
import get from 'lodash/get'
import { RatingWidget } from 'components'
import { getArticleRating, addArticleRatingMutation } from '../../queries'
import { useUserId } from '../../utils/auth'

const RateArticle = ({ id: articleId, content }) => {
  const userId = useUserId()
  const [fetchRatingData, { data, loading: fetching }] = useManualQuery(
    getArticleRating,
    {
      variables: {
        articleId,
        userId,
      },
    }
  )
  const [rateArticle, { loading: saving }] = useMutation(
    addArticleRatingMutation
  )

  useEffect(() => {
    if (userId) {
      fetchRatingData()
    }
  }, [userId, fetchRatingData])

  const ratingData = data || content
  const rating = get(ratingData, 'rating.aggregate.avg.rating') || 0
  const count = get(ratingData, 'rating.aggregate.count') || 0
  const userRating = get(ratingData, 'user_rating.0.rating')
  const disabled = !userId || fetching || saving

  return (
    <RatingWidget
      rating={rating}
      count={count}
      userRating={userRating}
      disabled={disabled}
      onRate={async rating => {
        await rateArticle({
          variables: {
            articleId,
            userId,
            rating,
          },
        })
        fetchRatingData()
      }}
    />
  )
}

RateArticle.propTypes = {
  id: T.number.isRequired,
  content: T.object.isRequired,
}

export default RateArticle
