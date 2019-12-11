import React from 'react'
import T from 'prop-types'
import { withStyles } from '@material-ui/core'

import ChartTicks from '../ChartTicks'
import Bar from './Bar'
import { chartDataShape } from './utils'

function BarChart({ classes, chartData, theme }) {
  const barHeight = theme.spacing(4)

  return (
    <div>
      <ChartTicks variant="above" height={barHeight} />
      {chartData &&
        chartData.map((dataItem, index) => (
          <ChartTicks variant="across" height={barHeight} key={`bar_${index}`}>
            <Bar value={dataItem.score} color={dataItem.color} absolute />
          </ChartTicks>
        ))}
    </div>
  )
}

BarChart.propTypes = {
  classes: T.object.isRequired,
  theme: T.object.isRequired,
  chartData: T.arrayOf(chartDataShape),
}

const styles = theme => ({
  label: {
    color: theme.palette.primary.dark,
  },
})

export default withStyles(styles, { withTheme: true })(BarChart)
