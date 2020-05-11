import React, { useEffect, useState, useContext } from 'react'
import AppBar from 'gatsby-plugin-orion-view/src/components/AppBar'
import { useQuery } from 'graphql-hooks'

import { AuthContext } from 'gatsby-plugin-orion-core/src/components/AuthWrapper'
import getMenuQuery from '../../queries/get-nested-menu.graphql'

export default function AcmeAppBar({
  brandTo,
  Logo,
  childIndicatorIcon,
  dropDownIndicatorIcon,
  userRole,
  menuData,
  location,
}) {
  const [menu, setMenu] = useState(menuData)
  const { data, loading, refetch } = useQuery(getMenuQuery)
  const auth = useContext(AuthContext)

  useEffect(() => {
    refetch()
  }, [location, refetch])

  useEffect(() => {
    if (!loading) {
      const menuParents = []
      data.orion_page.forEach(item => {
        const index =
          item.ancestry.length > 0 ? item.ancestry[0].ancestor_id : 0
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

      setMenu(mapChildren(menuParents[0]))
    }
  }, [auth, data, loading])

  return (
    <AppBar
      brandTo={brandTo}
      Logo={Logo}
      childIndicatorIcon={childIndicatorIcon}
      dropDownIndicatorIcon={dropDownIndicatorIcon}
      userRole={userRole}
      menuData={menu}
    />
  )
}
