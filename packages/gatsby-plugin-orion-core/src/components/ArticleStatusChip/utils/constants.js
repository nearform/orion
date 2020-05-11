import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'

export const articleStatusMap = {
  'in-progress': {
    label: 'In Progress',
  },
  'in-review': {
    label: 'Needs Review',
  },
  published: {
    label: 'Published',
  },
  hidden: {
    label: 'Hidden',
    Icon: VisibilityOffIcon,
  },
}
