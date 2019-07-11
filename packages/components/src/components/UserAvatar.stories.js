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
      email={text('email', 'example.mail@gmail.com')}
      fullName={text('Full Name', '')}
      memberType={text('Member Type', 'EFQM Member')}
      picture={text('picture url', '')}
    />
  ))
  .add('Variations', () => (
    <div>
      <Section>
        <Typography variant="h3">Just email</Typography>
        <UserAvatar email="john.doe@gmail.com" />
      </Section>
      <Section>
        <Typography variant="h3">Full name</Typography>
        <UserAvatar email="john.doe@email.com" fullName="John Roe" />
      </Section>
      <Section>
        <Typography variant="h3">With member type</Typography>
        <UserAvatar
          email="example.mail2@gmail.com"
          fullName="Jane Doe"
          memberType="EFQM member"
        />
      </Section>
      <Section>
        <Typography variant="h3">With picture</Typography>
        <UserAvatar
          email="example.mail@gmail.com"
          fullName="Jane Roe"
          memberType="EFQM member"
          picture="https://live.staticflickr.com/1512/24150166553_57637fca61_n.jpg"
        />
      </Section>
    </div>
  ))
