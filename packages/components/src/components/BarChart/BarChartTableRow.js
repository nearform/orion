import React, { useState } from 'react'
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
import { Link as RouterLink } from '@reach/router'
import { fade } from '@material-ui/core/styles/colorManipulator'

import Bar from './Bar'
import ChartTicks from '../ChartTicks'
import { getWeightedScore, chartDataShape } from './utils'

function BarChartTableRow({
  classes,
  theme,
  chartDataItem,
  barHeight,
  barTicksHeight,
  assessmentId,
  depth,
  isLast,
}) {
  const [isOpened, setIsOpened] = useState(false)
  const hasChildren = !!chartDataItem.scores

  const rowClasses = classnames(
    { [classes.standardRow]: !isOpened && depth === 0 },
    { [classes.stepDown]: depth > 0 },
    { [classes.criterionPartRow]: depth === 1 },
    { [classes.scoringRow]: depth === 2 },
    { [classes.opened]: isOpened },
    { [classes.clickable]: hasChildren },
    { [classes.lastRow]: isLast && !isOpened }
  )

  const weightedScore = getWeightedScore(chartDataItem)

  const barColor =
    depth === 2 ? theme.palette.background.dark : chartDataItem.color

  return (
    <>
      <TableRow
        onClick={() => hasChildren && setIsOpened(!isOpened)}
        className={rowClasses}
      >
        <TableCell className={classes.cell} size="medium">
          <Typography
            style={{ color: chartDataItem.color }}
            variant="h3"
            className={classes.scoreLabel}
          >
            {chartDataItem.path ? (
              <RouterLink
                to={`${chartDataItem.path}#${assessmentId}`}
                title={chartDataItem.label}
              >
                {chartDataItem.label}
              </RouterLink>
            ) : (
              chartDataItem.label
            )}
          </Typography>
        </TableCell>
        <TableCell className={classnames(classes.chartColumn, classes.cell)}>
          <ChartTicks
            variant="across"
            height={barTicksHeight}
            className={classes.barContainer}
          >
            <Bar
              value={weightedScore}
              color={barColor}
              height={barHeight}
              absolute
            />
          </ChartTicks>
        </TableCell>
        <TableCell align="right" className={classes.cell}>
          <Typography variant="h6" className={classes.score}>
            {Math.round(chartDataItem.score)}
          </Typography>
        </TableCell>
        <TableCell align="right" className={classes.cell}>
          <Typography variant="h6" className={classes.score}>
            {Math.round(weightedScore)}
            <Typography component="span" className={classes.weighting}>
              {chartDataItem.weighting && `(${chartDataItem.weighting})`}
            </Typography>
          </Typography>
        </TableCell>
      </TableRow>
      {isOpened && (
        <BarChartTableChildRows
          theme={theme}
          chartDataSubset={chartDataItem.scores}
          assessmentId={assessmentId}
          depth={depth + 1}
        />
      )}
    </>
  )
}

BarChartTableRow.defaultProps = {
  depth: 0,
}

BarChartTableRow.propTypes = {
  classes: T.object.isRequired,
  theme: T.object.isRequired,
  chartDataItem: chartDataShape.isRequired,
  barHeight: T.number,
  barTicksHeight: T.number,
  assessmentId: T.number,
  depth: T.number,
  isLast: T.bool,
}

BarChartTableChildRows.propTypes = {
  chartDataSubset: T.arrayOf(chartDataShape),
  isOpened: T.bool,
  barTicksHeight: T.number,
  barHeight: T.number,
}

const styles = theme => ({
  scoreLabel: {},
  standardRow: {
    '&:hover': {
      backgroundColor: fade(theme.palette.background.dark, 0.15),
    },
  },
  cell: {
    border: 'none',
  },
  opened: {
    backgroundColor: theme.palette.background.light,
    borderTop: `2px solid ${theme.palette.background.paper}`,
  },
  clickable: {
    cursor: 'pointer',
  },
  label: {
    color: theme.palette.primary.dark,
  },
  scoringRow: {
    '& $score': {
      fontSize: 12,
      color: theme.palette.background.dark,
      marginRight: theme.spacing(0.25),
    },
    '& $scoreLabel': {
      color: theme.palette.background.dark,
      marginLeft: theme.spacing(1.5),

      '&::before': {
        content: '""',
        position: 'absolute',
        display: 'block',
        width: 0,
        height: theme.spacing(4.5),
        marginTop: theme.spacing(-0.5),
        marginLeft: theme.spacing(-1.5),
        borderLeft: `solid ${theme.palette.background.dark} ${theme.spacing(
          0.5
        )}px`,
        borderRadius: theme.spacing(1),
      },
    },
    '&$lastRow': {
      '& $scoreLabel': {
        '&::before': {
          height: theme.spacing(2.5),
        },
      },
    },
  },
  criterionPartRow: {
    '& $scoreLabel': {
      color: theme.palette.primary.dark,
      '& a': {
        color: theme.palette.primary.dark,
      },
    },
  },
  lastRow: {
    borderBottom: `1px solid ${theme.palette.background.paper}`,
  },
  stepDown: {
    backgroundColor: theme.palette.background.light,
    '&:hover': {
      backgroundColor: fade(theme.palette.background.dark, 0.3),
    },
    '&$opened': {
      borderTopWidth: '1px',
    },
    '& $scoreLabel': {
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      textTransform: 'capitalize',
    },
    '& $score': {
      fontSize: 12,
      marginRight: theme.spacing(0.25),
    },
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
})

const StyledBarChartTableRow = withStyles(styles, { withTheme: true })(
  BarChartTableRow
)

function BarChartTableChildRows({ theme, chartDataSubset, ...props }) {
  if (!chartDataSubset) return null
  return chartDataSubset.map((chartDataChild, index) => (
    <StyledBarChartTableRow
      key={chartDataChild.key}
      chartDataItem={chartDataChild}
      barTicksHeight={theme.spacing(4)}
      barHeight={theme.spacing(1)}
      isFirst={index === 0}
      isLast={index === chartDataSubset.length - 1}
      {...props}
    />
  ))
}

export default StyledBarChartTableRow
