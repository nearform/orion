import React from 'react'
import T from 'prop-types'
import { storiesOf } from '@storybook/react'
import { jsxDecorator } from 'storybook-addon-jsx'
import { withKnobs, number } from '@storybook/addon-knobs'
import { withStyles } from '@material-ui/core'

import BarChart from './BarChart'
import { getSampleColors, getSampleData } from './utils.storybook.js'

const containerStyles = theme => ({
  root: {
    padding: 50,
    backgroundColor: theme.palette.background.paper,
    width: '50%',
    maxWidth: '500px',
    margin: '0 auto',
  },
})

function ContainedBarChart({ classes, theme }) {
  const sampleColors = getSampleColors(theme)
  const chartData = getSampleData(sampleColors)

  chartData.forEach((dataItem, index) => {
    dataItem.score = number(`#${index} - Score`, dataItem.score)
    if (dataItem.weighting)
      dataItem.weighting = number(`#${index} - Weighting`, dataItem.weighting)
  })

  return (
    <div className={classes.root}>
      <BarChart chartData={chartData} className={classes.element} />
    </div>
  )
}

ContainedBarChart.propTypes = {
  classes: T.object.isRequired,
  theme: T.object.isRequired,
}

const ThemedBarChart = withStyles(containerStyles, { withTheme: true })(
  ContainedBarChart
)

storiesOf('BarChart', module)
  .addDecorator(jsxDecorator)
  .addDecorator(withKnobs)
  .add('BarChart', () => <ThemedBarChart />)
