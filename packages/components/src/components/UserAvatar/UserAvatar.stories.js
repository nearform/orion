import React, { useState } from 'react'

import { storiesOf } from '@storybook/react'
import { jsxDecorator } from 'storybook-addon-jsx'
import { text } from '@storybook/addon-knobs'
import { Typography, Card, withStyles } from '@material-ui/core'

import UserAvatar from './UserAvatar'
import AvatarImage from './AvatarImage'
import CollapsedAvatars from './CollapsedAvatars'

const LabelHeading = withStyles(theme => ({
  root: {
    marginBottom: theme.spacing(2),
  },
}))(({ classes, children }) => (
  <Typography className={classes.root} variant="h3">
    {children}
  </Typography>
))

const Section = withStyles(theme => ({
  root: {
    padding: theme.spacing(2, 2),
    margin: theme.spacing(3),
  },
}))(Card)

const sampleUsers = [
  {
    label: 'Just email',
    user: { email: 'john.doe@gmail.com' },
  },
  {
    label: 'Full name',
    user: {
      email: 'john.doe@email.com',
      firstName: 'John',
      lastName: 'Roe',
    },
  },
  {
    label: 'With member title',
    user: {
      email: 'example.mail2@gmail.com',
      firstName: 'Jane',
      lastName: 'Doe',
      title: 'EFQM member',
    },
  },
  {
    label: 'With picture',
    user: {
      email: 'example.mail2@gmail.com',
      firstName: 'Jane',
      lastName: 'Doe',
      title: 'EFQM member',
      picture:
        'https://live.staticflickr.com/1512/24150166553_57637fca61_n.jpg',
    },
  },
]

const CollapsedAvatarsContainer = withStyles(_ => ({
  root: {
    width: '50%',
  },
}))(({ classes }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Section className={classes.root}>
      <CollapsedAvatars
        users={sampleUsers.map(({ user }) => user)}
        label="Collapsed user set"
        onClick={isOpen => setIsOpen(isOpen)}
        isOpen={isOpen}
      />
      {isOpen && (
        <div>
          {sampleUsers.map(sample => (
            <Section key={`CollapsedAvatars: ${sample.label}`}>
              <LabelHeading>{sample.label}</LabelHeading>
              <UserAvatar user={sample.user} />
            </Section>
          ))}
        </div>
      )}
    </Section>
  )
})

storiesOf('UserAvatar', module)
  .addDecorator(jsxDecorator)
  .add('Interactive UserAvatar', () => (
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
  .add('UserAvatar Variations', () => (
    <div>
      {sampleUsers.map(sample => (
        <Section key={`UserAvatar: ${sample.label}`}>
          <LabelHeading>{sample.label}</LabelHeading>
          <UserAvatar user={sample.user} />
        </Section>
      ))}
    </div>
  ))
  .add('AvatarImage Variations', () => (
    <div>
      {sampleUsers.map(sample => (
        <Section key={`AvatarImage: ${sample.label}`}>
          <LabelHeading>{sample.label}</LabelHeading>
          <AvatarImage user={sample.user} />
        </Section>
      ))}
    </div>
  ))
  .add('CollapsedAvatar Variations', () => <CollapsedAvatarsContainer />)
