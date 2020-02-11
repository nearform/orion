import ArticleStatusChip from './StatusChip/ArticleStatusChip'
import DataTable from './DataTable'
import React, { useMemo, useState } from 'react'
import { storiesOf } from '@storybook/react'
import { jsxDecorator } from 'storybook-addon-jsx'
import { number } from '@storybook/addon-knobs'

const columns = [
  {
    id: 'title',
    label: 'Content Title',
    sortable: true,
    align: 'left',
    minWidth: 150,
  },
  {
    id: 'author',
    label: 'Author',
    sortable: true,
    align: 'left',
    minWidth: 100,
  },
  {
    id: 'updated',
    label: 'Last Updated',
    sortable: false,
    align: 'left',
    minWidth: 100,
  },
  {
    id: 'type',
    label: 'Type',
    sortable: true,
    align: 'left',
    minWidth: 100,
    render: type => type.charAt(0).toUpperCase() + type.slice(1),
  },
  {
    id: 'status',
    label: 'Status',
    sortable: false,
    align: 'left',
    minWidth: 150,
    render: status => <ArticleStatusChip status={status} />,
  },
]

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)]
}

function randomData(length) {
  const titles = [
    '2020 sparks a year of new innovations',
    'New features and products coming',
    'Twenty Twenty vision - What can we',
  ]

  const authors = [
    'Damian Beresford',
    'Julian Goacher',
    'Kevin Devine',
    'Ken Ahlstrom',
  ]

  const updated = ['1st Mar 2020', '8th Feb 2020', '3rd Apr 2020']

  const types = ['article', 'news', 'page', 'video']

  const status = ['in-review', 'published', 'hidden', 'in-progress']

  const data = []

  for (let i = 0; i < length; i++) {
    data.push({
      id: i,
      title: randomItem(titles),
      author: randomItem(authors),
      updated: randomItem(updated),
      type: randomItem(types),
      status: randomItem(status),
    })
  }

  return data
}

function sortData(data, id, direction) {
  return data.sort((a, b) => {
    const x = a[id]
    const y = b[id]

    const value = x < y ? -1 : x > y ? 1 : 0

    return direction === 'asc' ? value : value * -1
  })
}

storiesOf('DataTable', module)
  .addDecorator(jsxDecorator)
  .add('Without pagination', () => {
    const rowCount = number('Row count', 25)
    const data = useMemo(() => randomData(rowCount), [rowCount])
    const [[activeSortId, activeSortDirection], setActiveSort] = useState([
      null,
      null,
    ])
    const sortedData = useMemo(
      () => sortData(data, activeSortId, activeSortDirection),
      [data, activeSortId, activeSortDirection]
    )

    return (
      <DataTable
        activeSortDirection={activeSortDirection}
        activeSortId={activeSortId}
        columns={columns}
        id="id"
        data={sortedData}
        onChangeSort={(id, direction) => setActiveSort([id, direction])}
      />
    )
  })
  .add('With pagination', () => {
    const rowCount = number('Row count', 100)
    const data = useMemo(() => randomData(rowCount), [rowCount])
    const [[activeSortId, activeSortDirection], setActiveSort] = useState([
      null,
      null,
    ])
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const sortedData = useMemo(
      () => sortData(data, activeSortId, activeSortDirection),
      [data, activeSortId, activeSortDirection]
    )

    const startIndex = rowsPerPage * page
    const endIndex = startIndex + rowsPerPage

    return (
      <DataTable
        isPaginated
        activeSortDirection={activeSortDirection}
        activeSortId={activeSortId}
        columns={columns}
        data={sortedData.slice(startIndex, endIndex)}
        id="id"
        page={page}
        rowCount={rowCount}
        rowsPerPage={rowsPerPage}
        onChangeSort={(id, direction) => setActiveSort([id, direction])}
        onChangePage={page => setPage(page)}
        onChangeRowsPerPage={rowsPerPage => setRowsPerPage(rowsPerPage)}
      />
    )
  })
