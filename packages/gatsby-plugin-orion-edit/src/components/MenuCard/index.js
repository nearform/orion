import React from 'react'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'
import { makeStyles } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

const cardSize = 256
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.common.white,
    height: cardSize,
    width: cardSize,
    margin: 16,
  },
  link: {
    display: 'block',
    height: '100%',
    textDecoration: 'none',
  },
  media: {
    minHeight: 200,
  },
}))
const MenuCard = ({ label, src, to }) => {
  const classes = useStyles()
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <Link to={to} className={classes.link}>
          <CardContent>
            <CardMedia className={classes.media} image={src} title={label} />
            <Typography
              align="center"
              color="secondary"
              variant="h5"
              component="h5"
            >
              {label}
            </Typography>
          </CardContent>
        </Link>
      </CardActionArea>
    </Card>
  )
}

MenuCard.propTypes = {
  label: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
}

export default MenuCard
