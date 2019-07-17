import React from 'react'

import { storiesOf } from '@storybook/react'
import { jsxDecorator } from 'storybook-addon-jsx'
import { text } from '@storybook/addon-knobs'

import _UserAvatar from './UserAvatar'
import { Typography, Card, withStyles } from '@material-ui/core'
const UserAvatar = withStyles(theme => ({
  root: {
    margin: theme.spacing(1),
  },
}))(_UserAvatar)
const Section = withStyles(theme => ({
  root: {
    padding: theme.spacing(1, 2),
    margin: theme.spacing(3),
  },
}))(Card)

storiesOf('UserAvatar', module)
  .addDecorator(jsxDecorator)
  .add('Interactive', () => (
    <UserAvatar
      user={{
        email: text('email', 'example.mail@gmail.com'),
        firstName: text('First Name', ''),
        lastName: text('Last Name', ''),
        title: text('Member Title', 'EFQM Member'),
        picture: text('picture url', ''),
      }}
    />
  ))
  .add('Variations', () => (
    <div>
      <Section>
        <Typography variant="h3">Just email</Typography>
        <UserAvatar user={{ email: 'john.doe@gmail.com' }} />
      </Section>
      <Section>
        <Typography variant="h3">Full name</Typography>
        <UserAvatar
          user={{
            email: 'john.doe@email.com',
            firstName: 'John',
            lastName: 'Roe',
          }}
        />
      </Section>
      <Section>
        <Typography variant="h3">With member title</Typography>
        <UserAvatar
          user={{
            email: 'example.mail2@gmail.com',
            firstName: 'Jane',
            lastName: 'Doe',
            title: 'EFQM member',
          }}
        />
      </Section>
      <Section>
        <Typography variant="h3">With picture</Typography>
        <UserAvatar
          user={{
            email: 'example.mail2@gmail.com',
            firstName: 'Jane',
            lastName: 'Doe',
            title: 'EFQM member',
            picture:
              'https://live.staticflickr.com/1512/24150166553_57637fca61_n.jpg',
          }}
        />
      </Section>
    </div>
  ))
