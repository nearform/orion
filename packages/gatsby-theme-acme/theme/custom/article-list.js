const palette = require('../mui/palette')

const common = {
  '& .MuiGrid-item img': {
    width: '100%',
    marginBottom: 11,
  },
  '& .MuiGrid-item h3': {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    lineClamp: 4,
    display: 'box',
    boxOrient: 'vertical',
    '& a': {
      color: palette.secondary.main,
      textDecoration: 'none',
    },
  },
  '& .MuiGrid-item p': {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    lineClamp: 4,
    display: 'box',
    boxOrient: 'vertical',
  },
  '& .MuiGrid-item h5': {
    opacity: 0.6,
  },
  '& .MuiGrid-item a': {
    display: 'block',
  },
  '& .MuiGrid-item:last-of-type a': {
    display: 'flex',
    alignItems: 'center',
  },
}

const featured = {
  minWidth: '100%',
  maxWidth: '50%',
}

const clippedImage = {
  clipPath: 'polygon(0 0, 100% 0%, 75% 100%, 0 100%)',
}

module.exports = {
  rowItem: {
    root: {
      ...common,
    },
    featured,
    clippedImage,
  },
  gridItem: {
    root: {
      minWidth: '33.3%',
      maxWidth: '50%',
      flex: 1,
      ...common,
    },
    featured,
    clippedImage,
  },
  highlightItem: {
    root: {
      ...common,
      boxShadow:
        '0 13px 27px -5px rgba(50, 50, 93, 0.25), 0 8px 4px -8px rgba(0, 0, 0, 0.1), 0 -6px 16px -6px rgba(0, 0, 0, 0.02)',
      borderRadius: 4,
      marginBottom: 50,
      overflow: 'hidden',
      '& .MuiGrid-item:first-of-type': {
        paddingRight: 16,
        '& a': {
          display: 'block',
          height: '100%',
        },
      },
      '& .MuiGrid-item:last-of-type': {
        paddingTop: 16,
        paddingBottom: 16,
      },
      '& .MuiGrid-item img': {
        width: '100%',
        height: '100%',
      },
      '& .MuiGrid-item h5': {
        opacity: 0.6,
      },
      '& .MuiGrid-item:last-of-type a': {
        display: 'flex',
        alignItems: 'center',
      },
    },
    clippedImage,
  },
}
