import React from 'react'
import T from 'prop-types'
import { storiesOf } from '@storybook/react'
import { withKnobs, number } from '@storybook/addon-knobs'
import { jsxDecorator } from 'storybook-addon-jsx'
import { withStyles } from '@material-ui/core'

import BarChartTable from './BarChartTable'
import { getSampleColors, getSampleData } from './util.storybook.js'

const containerStyles = theme => ({
  root: {
    padding: 50,
    backgroundColor: theme.palette.background.paper,
  },
})

function ContainedBarChartTable({ classes, theme }) {
  const sampleColors = getSampleColors(theme)
  const chartData = getSampleData(sampleColors)

  chartData.forEach((dataItem, index) => {
    dataItem.score = number(`#${index} - Score`, dataItem.score)
    if (dataItem.weighting)
      dataItem.weighting = number(`#${index} - Weighting`, dataItem.weighting)
  })

  return (
    <div className={classes.root}>
      <BarChartTable chartData={chartData} />
    </div>
  )
}

ContainedBarChartTable.propTypes = {
  classes: T.object.isRequired,
  theme: T.object.isRequired,
}

const ThemedBarChartTable = withStyles(containerStyles, { withTheme: true })(
  ContainedBarChartTable
)

storiesOf('BarChart', module)
  .addDecorator(jsxDecorator)
  .addDecorator(withKnobs)
  .add('BarChartTable', () => <ThemedBarChartTable />)
