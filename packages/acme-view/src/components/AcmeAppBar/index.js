import React, { useMemo, useEffect } from 'react'
import AppBar from 'gatsby-plugin-orion-view/src/components/AppBar'
import { useQuery } from 'graphql-hooks'

import getMenuQuery from '../../queries/get-nested-menu.graphql'

export default function AcmeAppBar({
  brandTo,
  logo,
  childIndicatorIcon,
  dropDownIndicatorIcon,
  userRole,
  menuData,
  location,
}) {
  const { data, loading, refetch } = useQuery(getMenuQuery)

  useEffect(() => {
    refetch()
  }, [location, refetch])

  const menu = useMemo(() => {
    if (loading) {
      return menuData
    }

    const menuParents = []
    data.orion_page.forEach(item => {
      const index = item.ancestry.length > 0 ? item.ancestry[0].ancestor_id : 0
      if (menuParents[index] === undefined) {
        menuParents[index] = []
      }

      menuParents[index].push(item)
    })

    const mapChildren = children => {
      return children.map(item =>
        menuParents[item.id] === undefined
          ? {
              label: item.title,
              to: item.path,
              children: [],
            }
          : {
              label: item.title,
              to: item.path,
              children: mapChildren(menuParents[item.id]),
            }
      )
    }

    return mapChildren(menuParents[0])
  }, [menuData, data, loading])

  return (
    <AppBar
      brandTo={brandTo}
      logo={logo}
      childIndicatorIcon={childIndicatorIcon}
      dropDownIndicatorIcon={dropDownIndicatorIcon}
      userRole={userRole}
      menuData={menu}
    />
  )
}
