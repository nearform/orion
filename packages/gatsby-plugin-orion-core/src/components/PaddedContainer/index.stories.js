import React from 'react'
import { makeStyles } from '@material-ui/core'
import { storiesOf } from '@storybook/react'
import { jsxDecorator } from 'storybook-addon-jsx'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import PaddedContainer from '.'

const useStyles = makeStyles(theme => ({
  wrapper: {
    border: `4px solid ${theme.palette.grey[600]}`,
  },
  content: {
    border: `4px dashed ${theme.palette.grey[400]}`,
    marginTop: theme.spacing(),
    marginBottom: theme.spacing(),
    padding: theme.spacing(),
    display: 'flex',
    justifyContent: 'space-between',
  },
  innerContent: {
    display: 'flex',
    justifyContent: 'center',
  },
  arrows: {
    width: '50px',
  },
}))

storiesOf('core/interactive/PaddedContainer', module)
  .addDecorator(jsxDecorator)
  .add('Padding changes when switching devices', () => {
    const { wrapper, content, innerContent, arrows } = useStyles()
    return (
      <div className={wrapper}>
        <PaddedContainer>
          <div className={content}>
            <div className={arrows}>
              <ArrowBackIcon />
              <ArrowBackIcon />
            </div>
            <div className={innerContent}>
              My parent&#39;s padding changes when selecting different devices
              from top toolbar
            </div>
            <div className={arrows}>
              <ArrowForwardIcon />
              <ArrowForwardIcon />
            </div>
          </div>
        </PaddedContainer>
      </div>
    )
  })
