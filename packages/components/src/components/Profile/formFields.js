import { Link, Email } from '@material-ui/icons'

import LinkedIn from '../../assets/social/linkedin.svg'
import Twitter from '../../assets/social/twitter.svg'

export default [
  {
    name: 'fullName',
    label: 'Name',
  },
  {
    name: 'title',
    label: 'Title',
  },
  {
    name: 'signupRequest.userAttributes.custom:country',
    label: 'Location',
  },
  {
    name: 'biography',
    label: 'Biography',
  },
  {
    name: 'avatar',
  },
  {
    name: 'linkedin',
    label: 'LinkedIn profile',
    icon: LinkedIn,
    iconClass: 'customIcon',
  },
  {
    name: 'website',
    label: 'Website',
    icon: Link,
    iconClass: 'linkIcon',
  },
  {
    name: 'signupRequest.userAttributes.email',
    label: 'Email',
    icon: Email,
  },
  {
    name: 'twitter',
    label: 'Twitter',
    icon: Twitter,
    iconClass: 'customIcon',
  },
  {
    name: 'consent_contact',
    label:
      'Is it ok for members to contact you through the EFQM Knowledge Base?',
  },
  {
    name: 'consent_directory',
    label: 'Do you want to be listed in the EFQM Knowledge Base directory',
  },
]
