// MUI media query ready CSS object for aligning elements in a COLUMN with a gap
// Note that elements immeidately wrapped by the component this code is added to
// should not use margins
export default theme => gap => ({
  display: 'flex',
  flexDirection: 'column',
  '& > *': {
    margin: theme.spacing(0, 0, gap, 0),
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(0, 0, gap / 2, 0),
    },
  },
  '& > *:last-child': {
    margin: 0,
  },
})
