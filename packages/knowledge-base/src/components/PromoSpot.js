import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { makeStyles, Typography } from '@material-ui/core'

const usePromoSpotStyles = makeStyles(theme => {
  const textPadding = {
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
  }
  return {
    wrapper: ({ src }) => ({
      alignItems: 'flex-end',
      backgroundImage: `url('${src}')`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      minHeight: '320px',
      paddingBottom: '24px',
      width: '100%',
    }),
    strapline: {
      ...theme.typography.h3,
      ...textPadding,
      backgroundColor: theme.palette.primary.light,
      maxWidth: '93%',
    },
    title: {
      ...theme.typography.h1,
      ...textPadding,
      backgroundColor: theme.palette.secondary.dark,
      maxWidth: '96%',
    },
  }
})

/*
 * Placeholder function for promo-spots
 * Definitely requires refactoring for full implementation
 */
function PromoSpot({ link, strapline, title }) {
  const content = useStaticQuery(graphql`
    query {
      efqmAwards: file(name: { eq: "efqm-lyon-2020" }) {
        childImageSharp {
          fixed(width: 320) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)

  const classes = usePromoSpotStyles({
    src: content.efqmAwards.childImageSharp.fixed.src,
  })

  return (
    <a className={classes.wrapper} href={link}>
      <Typography className={classes.title}>{title}</Typography>
      <Typography className={classes.strapline}>{strapline}</Typography>
    </a>
  )
}

export default PromoSpot
