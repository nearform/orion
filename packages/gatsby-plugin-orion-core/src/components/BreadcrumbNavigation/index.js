import React from 'react'
import T from 'prop-types'
import { Link } from '@reach/router'
import { Breadcrumbs, Typography } from '@material-ui/core'
import ArrowRightAlt from '@material-ui/icons/ArrowRightAlt'

function BreadcrumbNavigation({
  data = [],
  itemsAfterCollapse,
  itemsBeforeCollapse,
  maxItems,
  separator,
  ...props
}) {
  return (
    <Breadcrumbs
      itemsAfterCollapse={itemsAfterCollapse}
      itemsBeforeCollapse={itemsBeforeCollapse}
      maxItems={maxItems}
      separator={separator || <ArrowRightAlt />}
      {...props}
    >
      {data.map(({ title, to }) =>
        to === undefined ? (
          <Typography key={title}>{title}</Typography>
        ) : (
          <Link key={title} to={to}>
            {title}
          </Link>
        )
      )}
    </Breadcrumbs>
  )
}

BreadcrumbNavigation.propTypes = {
  data: T.arrayOf(
    T.shape({
      title: T.string.isRequired,
      to: T.string,
    })
  ),
  itemsAfterCollapse: T.number,
  itemsBeforeCollapse: T.number,
  maxItems: T.number,
  separator: T.element,
}

export default BreadcrumbNavigation
