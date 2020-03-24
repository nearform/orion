import React, { useCallback, useEffect, useState } from 'react'
import TreeView from '../TreeView'
import { mutateTree, moveItemOnTree } from '@atlaskit/tree'
import { useEditComponents } from '../EditComponentProvider'
import { useQuery } from 'graphql-hooks'

import getPagesQuery from '../../queries/get-pages'

function PageTree() {
  const { data } = useQuery(getPagesQuery)
  const { layouts } = useEditComponents()
  const [tree, setTree] = useState(null)

  useEffect(() => {
    const items = {
      root: {
        id: 'root',
        title: 'root',
        allowChildren: true,
        children: [],
      },
    }

    if (data) {
      items.root.children = data.orion_page
        .filter(page => page.ancestry.length === 0)
        .map(item => item.id)

      for (const page of data.orion_page) {
        const filter = descendant =>
          descendant.ancestry.find(ancestor => {
            return ancestor.ancestor.id === page.id && ancestor.direct
          })

        items[page.id] = {
          id: page.id,
          title: page.title,
          to: `/pages/${page.id}/edit`,
          children: data.orion_page.filter(filter).map(item => item.id),
          allowChildren: layouts[page.layout].allowChildren,
          iconClass:
            page.path === '/'
              ? 'fas fa-home'
              : layouts[page.layout].allowChildren
              ? 'fas fa-file'
              : 'fas fa-long-arrow-alt-right',
        }
      }
    }

    setTree({
      rootId: 'root',
      items,
    })
  }, [data, layouts, setTree])

  const onExpand = useCallback(
    id => {
      setTree(mutateTree(tree, id, { isExpanded: true }))
    },
    [tree, setTree]
  )

  const onCollapse = useCallback(
    id => {
      setTree(mutateTree(tree, id, { isExpanded: false }))
    },
    [tree, setTree]
  )

  const onDragEnd = useCallback(
    (source, destination) => {
      if (!destination) {
        return
      }

      const newParent = tree.items[destination.parentId]

      if (!newParent.allowChildren) {
        return
      }

      setTree(moveItemOnTree(tree, source, destination))
    },
    [tree, setTree]
  )

  if (!tree) {
    return null
  }

  return (
    <TreeView
      isDragEnabled
      isNestingEnabled
      tree={tree}
      onCollapse={onCollapse}
      onDragEnd={onDragEnd}
      onExpand={onExpand}
    />
  )
}

export default PageTree
