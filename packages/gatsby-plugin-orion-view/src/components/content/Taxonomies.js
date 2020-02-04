import React from 'react'
import { navigate } from '@reach/router' // eslint-disable-line import/no-extraneous-dependencies
import classnames from 'classnames'
import { withStyles, Typography, Button, Hidden } from '@material-ui/core'
import useTaxonomies from 'gatsby-plugin-orion-core/hooks/useTaxonomies'
import TaxonomyItem from './TaxonomyItem'

const Taxonomies = ({ classes, taxonomyIds, showAll, callback }) => {
  const taxonomyTypes = useTaxonomies(taxonomyIds)
  const handleCallback = (id, active, key) => {
    if (showAll && typeof callback === 'function') {
      callback(id, active)
      return
    }

    if (!showAll) {
      navigate('/section/' + key)
    }
  }

  /* eslint-disable react/jsx-no-useless-fragment */
  return (
    <>
      {taxonomyTypes.map((type, index) => {
        return showAll || type.active ? (
          <div
            key={'taxonomy_type_' + type.name}
            className={classes.TaxonomyType}
          >
            <Hidden xsDown implementation="css">
              <Typography
                className={classnames(classes.inlinable, classes.subhead)}
              >
                {type.name}
              </Typography>
            </Hidden>
            <Hidden smUp implementation="css">
              {/* Button needed to align text properly with TaxonomyItem that are button styles */}
              <Button
                disabled
                className={classnames(classes.inlinable, classes.subhead)}
              >
                {type.name}
              </Button>
            </Hidden>

            {type.taxonomy_items.map(item =>
              showAll || item.active ? (
                <TaxonomyItem
                  key={`tax_item_${item.id}`}
                  item={item}
                  active={taxonomyIds.includes(item.id)}
                  activeClassName={`TaxonomyC${index + 1}`}
                  callback={handleCallback}
                />
              ) : null
            )}
          </div>
        ) : null
      })}
    </>
  )
  /* eslint-enable react/jsx-no-useless-fragment */
}

export default withStyles(theme => ({
  inlinable: {
    [theme.breakpoints.down('xs')]: {
      display: 'inline-block',
    },
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  subhead: {
    fontWeight: '900',
    fontSize: '12px',
    letterSpacing: '1.8px',
    textTransform: 'uppercase',
    marginTop: '12px',
    color: theme.palette.tertiary.main,
    [theme.breakpoints.down('xs')]: {
      marginTop: '0px',
      padding: '6px 7px',
      '&:disabled': {
        color: theme.palette.tertiary.main,
      },
    },
  },
  TaxonomyType: {
    margin: theme.spacing(1, 0, 1.5),
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(0),
    },
  },
}))(Taxonomies)
