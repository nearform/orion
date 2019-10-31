import React from 'react'
import { Box, Typography, makeStyles } from '@material-ui/core'
import T from 'prop-types'
import { useTranslation } from 'react-i18next'

const useLinkStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  heading: {
    marginBottom: theme.spacing(2),
  },
}))

const HeadedAsidePanel = ({ children, title }) => {
  const { heading, wrapper } = useLinkStyles()
  const { t } = useTranslation()

  return (
    <Box
      className={wrapper}
      component="aside"
      data-test-id="headed-aside-panel"
    >
      <Typography className={heading} variant="h3">
        {t(title)}
      </Typography>
      {children}
    </Box>
  )
}

HeadedAsidePanel.propTypes = {
  children: T.any,
  title: T.string,
}

export default HeadedAsidePanel
