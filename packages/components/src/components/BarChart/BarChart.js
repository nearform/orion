import React from 'react'
import T from 'prop-types'
import {
  withStyles,
  Paper,
  Table,
  TableHead,
  TableBody,
  Tooltip,
  Typography,
} from '@material-ui/core'

import ChartTicks from '../ChartTicks'
import Bar from './Bar'
import { chartDataShape } from './utils'

const LightTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.primary.dark,
    boxShadow: theme.shadows[1],
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
}))(Tooltip)

function BarChart({ classes, chartData, theme }) {
  const barHeight = theme.spacing(4)
  return (
    <div>
      <ChartTicks variant="above" height={barHeight} />
      {chartData &&
        chartData.map((dataItem, index) => {
          const { label, color, score } = dataItem
          return (
            <LightTooltip
              placement="top-start"
              title={
                <>
                  {label}: <b>{score}%</b>
                </>
              }
              key={`bar_${index}`}
            >
              <div>
                <ChartTicks
                  variant="across"
                  height={barHeight}
                  showBackground={score === 0}
                >
                  <Bar value={score} color={color} absolute />
                </ChartTicks>
              </div>
            </LightTooltip>
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
