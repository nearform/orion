export default theme => ({
  width: '100%',
  '& .MuiTypography-h5': {
    opacity: 0.6,
  },
  '& .MuiTypography-h3 > a': {
    ...theme.typography.h3,
    textDecoration: 'none',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    lineClamp: 4,
    display: 'box',
    boxOrient: 'vertical',
  },
  '& .MuiTypography-body1': {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    lineClamp: 3,
    display: 'box',
    boxOrient: 'vertical',
  },
  '& .MuiCard-root': {
    display: 'flex',
    flexDirection: 'column',
  },
  '& .MuiCardMedia-root': {
    height: 0,
    paddingTop: '50%',
  },
  '& .MuiCardActions-root': {
    marginTop: 'auto',
    marginBottom: '1px',
  },
  '& .MuiSvgIcon-root': {
    marginTop: 8,
  },
})
