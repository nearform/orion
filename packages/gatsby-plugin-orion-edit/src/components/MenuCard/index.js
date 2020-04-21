import React from 'react'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'
import { makeStyles } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
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
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    marginTop: '16px',
  },
  image: {
    minHeight: '184px',
    display: 'flex',
    alignItems: 'flex-end',
  },
}))
const MenuCard = ({ label, Image, to }) => {
  const classes = useStyles()
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <Link to={to} className={classes.link}>
          <CardContent className={classes.content}>
            {Image && (
              <div className={classes.image}>
                <Image />
              </div>
            )}
            <Typography
              align="center"
              color="secondary"
              variant="h5"
              component="h5"
              className={classes.title}
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
  Image: PropTypes.node.isRequired,
}

export default MenuCard
