import React from 'react'
import T from 'prop-types'
import {
  withStyles,
  Paper,
  Table,
  TableHead,
  TableBody,
  // Tooltip,
  Typography,
} from '@material-ui/core'

import ChartTicks from '../ChartTicks'
import Bar from './Bar'
import { getWeightedScore, chartDataShape } from './utils'

function BarChart({ classes, chartData, theme }) {
  const barHeight = theme.spacing(4)

  return (
    <div>
      <ChartTicks variant="above" height={barHeight} />
      {chartData &&
        chartData.map((dataItem, index) => {
          const weightedScore = getWeightedScore(dataItem)

          /** TODO: Tooltip works, but needs design input on tooltip styling, behaviour and content

        const tooltipTitle = `
          ${dataItem.label}: ${weightedScore} ${dataItem.weighting ? `(${dataItem.score} × ${dataItem.weighting})` : ''}
        `
        */
          return (
            /*<Tooltip placement="right-start" title={tooltipTitle}>
            <div>*/
            <ChartTicks
              variant="across"
              height={barHeight}
              key={`bar_${index}`}
            >
              <Bar value={weightedScore} color={dataItem.color} absolute />
            </ChartTicks>
            /*</div>
          </Tooltip>*/
          )
        })}
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
