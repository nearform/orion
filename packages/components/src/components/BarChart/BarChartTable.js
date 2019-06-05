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
  const barHeight = theme.spacing(4)
  const barTicksHeight = theme.spacing(6)
  const overallScore = getOverallScore(chartData)

  return (
    <Paper>
      <Table size="small">
        <TableHead>
          <TableRow className={classes.headerFooter}>
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
          <TableRow className={classes.headerFooter}>
            <TableCell colSpan={3} align="right" padding="none">
              <Typography variant="h4" color="textSecondary">
                Overall score
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography
                variant="h6"
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
    padding: theme.spacing(0, 3, 0, 0),
    width: '40%',
    minWidth: theme.spacing(20),
  },
  score: {
    color: theme.palette.primary.dark,
  },
  weighting: {
    // Fixed width so that alignment is consistent even when empty
    width: theme.spacing(4),
    margin: theme.spacing(0, 1, 0.5),
    display: 'inline-block',
    verticalAlign: 'middle',
    textAlign: 'center',
    fontSize: 11,
    fontWeight: 'bold',
    color: theme.palette.primary.main,
  },
  overall: {
    color: theme.palette.primary.main,
    marginRight: theme.spacing(1),
  },
  headerFooter: {
    height: theme.spacing(5),
  },
})

export default withStyles(styles, { withTheme: true })(BarChartTable)
