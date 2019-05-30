import T from 'prop-types'

function getWeightedScore(dataItem) {
  return Math.round(dataItem.score * (dataItem.weighting || 1))
}

function getOverallScore(chartData) {
  return chartData.reduce(
    (acc, dataItem) => acc + getWeightedScore(dataItem),
    0
  )
}

const chartDataPropTypes = T.arrayOf(
  T.shape({
    score: T.number.isRequired,
    color: T.string,
    weighted: T.number,
    label: T.string,
  })
)

export { getWeightedScore, getOverallScore, chartDataPropTypes }
