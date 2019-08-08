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

import BarChartTableRow from './BarChartTableRow'
import ChartTicks from '../ChartTicks'
import { getOverallScore, chartDataShape } from './utils'

function BarChartTable({ classes, theme, chartData, assessmentId }) {
  const barHeight = theme.spacing(4)
  const barTicksHeight = theme.spacing(6)
  const overallScore = chartData
    ? Math.round(getOverallScore(chartData))
    : 'Loading...'

  return (
    <Paper>
      <Table size="small" className={classes.table}>
        <TableHead>
          <TableRow className={classes.headerFooter}>
            <TableCell className={classes.labelColumn}>Criteria</TableCell>
            <TableCell className={classes.chartColumn}>
              <ChartTicks
                variant="above"
                height={barHeight}
                className={classes.barContainer}
              />
            </TableCell>
            <TableCell className={classes.scoreColumn} align="center">
              Score
            </TableCell>
            <TableCell
              className={classnames(classes.weightedColumn, classes.nowrap)}
              align="center"
            >
              Weighted score
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {chartData &&
            chartData.map((chartDataItem, index) => (
              <BarChartTableRow
                key={chartDataItem.key}
                isVisible={true}
                chartDataItem={chartDataItem}
                barHeight={barHeight}
                barTicksHeight={barTicksHeight}
                assessmentId={assessmentId}
                isFirst={index === 0}
                isLast={index === chartData.length - 1}
              />
            ))}
        </TableBody>
        <TableFooter>
          <TableRow className={classes.headerFooter}>
            <TableCell colSpan={3} align="right" padding="none">
              <Typography variant="h4" color="textSecondary">
                Overall score
              </Typography>
            </TableCell>
            <TableCell align="right">
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
  chartData: T.arrayOf(chartDataShape),
  assessmentId: T.number,
}

const styles = theme => ({
  table: {
    tableLayout: 'fixed',
  },
  labelColumn: {
    width: '30%',
  },
  chartColumn: {
    padding: theme.spacing(0, 3, 0, 0),
    width: '40%',
    minWidth: theme.spacing(20),
  },
  scoreColumn: {
    width: '10%',
  },
  weightedColumn: {
    width: '20%',
  },
  nowrap: {
    whiteSpace: 'nowrap',
  },
  score: {
    color: theme.palette.primary.dark,
  },
  overall: {
    color: theme.palette.primary.main,
    marginRight: theme.spacing(6),
  },
  headerFooter: {
    height: theme.spacing(5),
  },
})

export default withStyles(styles, { withTheme: true })(BarChartTable)
