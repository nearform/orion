import React from 'react'
import { render, fireEvent, waitForElement } from '@testing-library/react'
import HorizontalNavigationMenu from './HorizontalNavigationMenu'

// Prevent errors loading the reach router Links
jest.mock(`@reach/router/lib/utils`)

test('Displays links for root items if no children', async () => {
  expect.assertions(3)

  const menuData = [
    { label: 'Root1', to: '/one' },
    { label: 'Root2', to: '/two' },
    { label: 'Root3', children: [{ label: 'Child1' }] },
  ]

  const { getByText } = render(<HorizontalNavigationMenu data={menuData} />)
  const link1 = getByText('Root1').closest('a')
  const link2 = getByText('Root2').closest('a')
  const link3 = getByText('Root3').closest('a')

  expect(link1).toBeInTheDocument()
  expect(link2).toBeInTheDocument()
  expect(link3).not.toBeInTheDocument()
})

test('Displays buttons for root items if children', async () => {
  expect.assertions(3)

  const menuData = [
    { label: 'Root1', to: '/one' },
    { label: 'Root2', to: '/two' },
    { label: 'Root3', children: [{ label: 'Child1' }] },
  ]

  const { getByText } = render(<HorizontalNavigationMenu data={menuData} />)
  const link1 = getByText('Root1').closest('button')
  const link2 = getByText('Root2').closest('button')
  const link3 = getByText('Root3').closest('button')

  expect(link1).not.toBeInTheDocument()
  expect(link2).not.toBeInTheDocument()
  expect(link3).toBeInTheDocument()
})

test('Clicking a root with children displays submenu', async () => {
  expect.assertions(2)

  const menuData = [
    { label: 'Root1', to: '/one' },
    { label: 'Root2', to: '/two' },
    {
      label: 'Root3',
      children: [
        { label: 'Child1', to: '/child1' },
        { label: 'Child2', to: '/child2' },
      ],
    },
  ]

  const { getByText } = render(<HorizontalNavigationMenu data={menuData} />)

  fireEvent.click(getByText('Root3'))

  const [child1, child2] = await waitForElement(() => [
    getByText('Child1'),
    getByText('Child2'),
  ])

  expect(child1).toBeInTheDocument()
  expect(child2).toBeInTheDocument()
})
