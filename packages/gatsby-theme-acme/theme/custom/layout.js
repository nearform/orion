module.exports = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    '& main': {
      flex: 1,
    },
    '& footer > div': {
      overflow: 'hidden',
    },
  },
}
