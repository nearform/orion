import React, { useContext } from 'react'
import { graphql } from 'gatsby'
import { withStyles } from '@material-ui/core'

function AssessmentsHome({ theme, classes, data }) {


  return (
    <div>
      home
    </div>
  )
}

const styles = theme => ({

})

export default withStyles(styles, { withTheme: true })(AssessmentsHome)
