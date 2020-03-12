module.exports = {
  container: {
    root: {
      marginTop: 20,
      '& .MuiTypography-h5': {
        marginBottom: 20,
      },
      '& .serp-preview': {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#d2d6dc',
        padding: 20,
        marginBottom: 30,
        width: 540,
        borderRadius: '0.2rem',
        boxShadow: '0 1px 3px 0 rgba(0,0,0,.1), 0 1px 2px 0 rgba(0,0,0,.06)',
      },
    },
  },
  item: {
    root: {
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: '#d2d6dc',
      padding: 20,
      paddingLeft: 4,
      width: 540,
      margin: 0,
      borderRadius: '0.2rem',
      boxShadow: '0 1px 3px 0 rgba(0,0,0,.1), 0 1px 2px 0 rgba(0,0,0,.06)',
      '& > .MuiGrid-Container': {
        marginLeft: -12,
      },
      '& label': {
        display: 'block',
        marginLeft: 12,
        marginRight: 12,
        paddingTop: 12,
      },
    },
  },
}
