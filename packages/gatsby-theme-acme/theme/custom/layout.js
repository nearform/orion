module.exports = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    '& main': {
      flex: 1,
      padding: '32px 0',
    },
    '& footer > div': {
      overflow: 'hidden',
    },
  },
}
