import React from 'react'
import T from 'prop-types'
import {
  withStyles,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableFooter,
  Typography,
} from '@material-ui/core'
import classnames from 'classnames'

import Bar from './Bar'
import ChartTicks from '../ChartTicks'
import {
  getWeightedScore,
  getOverallScore,
  chartDataPropTypes,
} from './util.js'

function BarChartTable({ classes, chartData, theme }) {
  const barHeight = theme.spacing.unit * 4
  const barTicksHeight = theme.spacing.unit * 6
  const overallScore = getOverallScore(chartData)

  return (
    <Paper>
      <Table padding="dense">
        <TableHead>
          <TableRow>
            <TableCell>Criteria</TableCell>
            <TableCell className={classes.chartColumn}>
              <ChartTicks
                variant="above"
                height={barHeight}
                className={classes.barContainer}
              />
            </TableCell>
            <TableCell align="center">Score</TableCell>
            <TableCell align="center" className={classes.nowrap}>
              Weighted score
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {chartData.map((dataItem, index) => {
            const weightedScore = getWeightedScore(dataItem)
            return (
              <TableRow key={`bar_row_${index}`} hover>
                <TableCell>
                  <Typography style={{ color: dataItem.color }} variant="h3">
                    {dataItem.label}
                  </Typography>
                </TableCell>
                <TableCell className={classes.chartColumn}>
                  <ChartTicks
                    variant="across"
                    height={barTicksHeight}
                    className={classes.barContainer}
                  >
                    <Bar
                      value={weightedScore}
                      color={dataItem.color}
                      height={barHeight}
                      absolute
                    />
                  </ChartTicks>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="h6" className={classes.score}>
                    {dataItem.score}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="h6" className={classes.score}>
                    {weightedScore}
                    <Typography component="span" className={classes.weighting}>
                      {dataItem.weighting && `(${dataItem.weighting})`}
                    </Typography>
                  </Typography>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3} align="right" padding="none">
              <Typography variant="h4" color="textSecondary">
                Overall score
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography
                className={classnames(classes.score, classes.overall)}
              >
                {overallScore}
              </Typography>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </Paper>
  )
}

BarChartTable.propTypes = {
  classes: T.object.isRequired,
  theme: T.object.isRequired,
  chartData: chartDataPropTypes,
}

const styles = theme => ({
  label: {
    color: theme.palette.primary.dark,
  },
  nowrap: {
    whiteSpace: 'nowrap',
  },
  chartColumn: {
    padding: `0 ${theme.spacing.unit * 3}px 0 0`,
    width: '40%',
    minWidth: theme.spacing.unit * 20,
  },
  score: {
    color: theme.palette.primary.dark,
  },
  weighting: {
    // Fixed width so that alignment is consistent even when empty
    width: theme.spacing.unit * 4,
    margin: `0 ${theme.spacing.unit}px ${theme.spacing.unit / 2}px`,
    display: 'inline-block',
    verticalAlign: 'middle',
    textAlign: 'center',
    fontSize: 11,
    fontWeight: 'bold',
    color: theme.palette.primary.main,
  },
  overall: {
    color: theme.palette.primary.main,
    marginRight: theme.spacing.unit,
  },
})

export default withStyles(styles, { withTheme: true })(BarChartTable)
