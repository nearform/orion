import React from 'react'
import { Box, makeStyles, Typography } from '@material-ui/core'

import column from '../../layout/utils/flex-with-gap/column'
import row from '../../layout/utils/flex-with-gap/row'

import bmwBase64 from '../../../assets/partner-logos/bmw-base-64'
import boschBase64 from '../../../assets/partner-logos/bosch-base-64'
import infineonBase64 from '../../../assets/partner-logos/infineon-base-64'
import siemensBase64 from '../../../assets/partner-logos/siemens-base-64'

const useGainKnowledgeLinksStyles = makeStyles(theme => ({
  logos: {
    ...row(theme)(6),
    alignItems: 'center',
  },
  title: {
    ...theme.typography.h3,
    color: theme.palette.secondary.main,
  },
  wrapper: {
    ...column(theme)(4),
    alignItems: 'center',
  },
}))

const GainKnowledgeLinks = () => {
  const { logos, title, wrapper } = useGainKnowledgeLinksStyles()

  return (
    <Box
      className={wrapper}
      component="section"
      data-test-id="gain-knowledge-links"
    >
      <Typography className={title} component="h2">
        Gain knowledge from these leading companies
      </Typography>
      <Box className={logos}>
        <img src={boschBase64} alt="Bosch" />
        <img src={infineonBase64} alt="Infineon" />
        <img src={bmwBase64} alt="BMW" />
        <img src={siemensBase64} alt="Siemens" />
      </Box>
    </Box>
  )
}

export default GainKnowledgeLinks
