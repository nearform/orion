import React from 'react'
import { withStyles } from '@material-ui/core'
import { storiesOf } from '@storybook/react'
import { jsxDecorator } from 'storybook-addon-jsx'

import UserRoleChip, { ROLE_STATUS } from './UserRoleChip'

const Container = withStyles(theme => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(1),
    },
  },
}))(({ classes, ...props }) => <div className={classes.root} {...props} />)

storiesOf('StatusChip', module)
  .addDecorator(jsxDecorator)
  .add('UserRoleChip', () => (
    <Container>
      {Object.values(ROLE_STATUS).map(status => (
        <UserRoleChip key={status} status={status} />
      ))}
    </Container>
  ))
