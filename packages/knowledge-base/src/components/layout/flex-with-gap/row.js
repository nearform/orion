// MUI media query ready CSS object for aligning elements in a ROW with a gap
// Note that elements immeidately wrapped by the component this code is added to
// should not use margins
export default theme => gap => ({
  display: 'flex',
  '& > *': {
    margin: theme.spacing(0, gap, 0, 0),
  },
  '& > *:last-child': {
    margin: 0,
  },
})
