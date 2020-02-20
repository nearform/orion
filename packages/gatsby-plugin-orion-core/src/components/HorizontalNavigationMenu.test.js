import React from 'react'
import { render, fireEvent, waitForElement } from '@testing-library/react'
import HorizontalNavigationMenu from './HorizontalNavigationMenu'

let menuData

beforeEach(() => {
  menuData = [
    { label: 'rootA', to: '/rootA' },
    { label: 'rootB', to: '/rootB' },
    {
      label: 'rootC',
      children: [
        { label: 'childA', to: '/childA' },
        {
          label: 'childB',
          to: '/childB',
          children: [
            { label: 'childBA', to: '/childBA' },
            { label: 'childBB', to: '/childBB' },
          ],
        },
      ],
    },
  ]
})

function renderMenu() {
  return render(<HorizontalNavigationMenu data={menuData} />)
}

function renderFirstChildren(menuRenderResult) {
  const { getByText } = menuRenderResult

  fireEvent.click(getByText('rootC'))

  return waitForElement(() => [getByText('childA'), getByText('childB')])
}

describe('root menu items', () => {
  test('renders links if no children', () => {
    expect.assertions(5)

    const { getByText } = renderMenu()

    // TODO: test url here and elsewhere
    const linkA = getByText('rootA').closest('a')
    const linkB = getByText('rootB').closest('a')
    const linkC = getByText('rootC').closest('a')

    expect(linkA).toBeInTheDocument()
    expect(linkA).toHaveAttribute('href', '/rootA')
    expect(linkB).toBeInTheDocument()
    expect(linkB).toHaveAttribute('href', '/rootB')
    expect(linkC).not.toBeInTheDocument()
  })

  test('renders button if children', () => {
    expect.assertions(3)

    const { getByText } = renderMenu()

    const buttonA = getByText('rootA').closest('button')
    const buttonB = getByText('rootB').closest('button')
    const buttonC = getByText('rootC').closest('button')

    expect(buttonA).not.toBeInTheDocument()
    expect(buttonB).not.toBeInTheDocument()
    expect(buttonC).toBeInTheDocument()
  })

  test('clicking with children displays submenu', async () => {
    expect.assertions(2)

    const { getByText } = renderMenu()

    fireEvent.click(getByText('rootC'))

    const [childA, childB] = await waitForElement(() => [
      getByText('childA'),
      getByText('childB'),
    ])

    expect(childA).toBeInTheDocument()
    expect(childB).toBeInTheDocument()
  })

  test('can have left icon', () => {
    menuData[0].leftIconClass = 'test-class'

    const { getByText } = renderMenu()

    const spans = getByText('rootA').querySelectorAll('span.material-icons')

    expect(spans).toHaveLength(1)
    expect(spans[0]).toHaveClass('test-class')
  })

  test('can have right icon', () => {
    menuData[0].rightIconClass = 'test-class'

    const { getByText } = renderMenu()

    const spans = getByText('rootA').querySelectorAll('span.material-icons')

    expect(spans).toHaveLength(1)
    expect(spans[0]).toHaveClass('test-class')
  })

  test('can have left and right icons', () => {
    menuData[0].leftIconClass = 'test-class1'
    menuData[0].rightIconClass = 'test-class2'

    const { getByText } = renderMenu()

    const spans = getByText('rootA').querySelectorAll('span.material-icons')

    expect(spans).toHaveLength(2)
    expect(spans[0]).toHaveClass('test-class1')
    expect(spans[1]).toHaveClass('test-class2')
  })

  test('down indicator defaults to chevron', () => {
    const renderResult = renderMenu()
    const spans = renderResult
      .getByText('rootC')
      .querySelectorAll('span.material-icons')

    expect(spans).toHaveLength(1)
    expect(spans[0]).toHaveClass('fa-chevron-down')
  })

  test('down indicator can be set', async () => {
    expect.assertions(2)

    const renderResult = render(
      <HorizontalNavigationMenu
        data={menuData}
        dropDownIndicatorIcon="test-class"
      />
    )
    const spans = renderResult
      .getByText('rootC')
      .querySelectorAll('span.material-icons')

    expect(spans).toHaveLength(1)
    expect(spans[0]).toHaveClass('test-class')
  })
})

describe('child menu items', () => {
  test('rendered as a links', async () => {
    expect.assertions(4)

    const renderResult = await renderMenu()
    const [childA, childB] = await renderFirstChildren(renderResult)

    const linkA = childA.closest('a')
    const linkB = childB.closest('a')
    expect(linkA).toBeInTheDocument()
    expect(linkA).toHaveAttribute('href', '/childA')
    expect(linkB).toBeInTheDocument()
    expect(linkB).toHaveAttribute('href', '/childB')
  })

  test('hovering with children reveals sub menu', async () => {
    expect.assertions(4)

    const renderResult = await renderMenu()
    const [, childB] = await renderFirstChildren(renderResult)

    fireEvent.mouseEnter(childB)

    const [childBA, childBB] = await waitForElement(() => [
      renderResult.getByText('childBA'),
      renderResult.getByText('childBB'),
    ])

    const linkBA = childBA.closest('a')
    const linkBB = childBB.closest('a')

    expect(linkBA).toBeInTheDocument()
    expect(linkBA).toHaveAttribute('href', '/childBA')
    expect(linkBB).toBeInTheDocument()
    expect(linkBB).toHaveAttribute('href', '/childBB')
  })

  test('can have left icon', async () => {
    expect.assertions(2)

    menuData[2].children[0].leftIconClass = 'test-class'

    const renderResult = renderMenu()
    const [childA] = await renderFirstChildren(renderResult)

    const spans = childA.querySelectorAll('span.material-icons')

    expect(spans).toHaveLength(1)
    expect(spans[0]).toHaveClass('test-class')
  })

  test('can have right icon', async () => {
    expect.assertions(2)

    menuData[2].children[0].rightIconClass = 'test-class'

    const renderResult = renderMenu()
    const [childA] = await renderFirstChildren(renderResult)

    const spans = childA.querySelectorAll('span.material-icons')

    expect(spans).toHaveLength(1)
    expect(spans[0]).toHaveClass('test-class')
  })

  test('can have left and right icons', async () => {
    expect.assertions(3)

    menuData[2].children[0].leftIconClass = 'test-class1'
    menuData[2].children[0].rightIconClass = 'test-class2'

    const renderResult = renderMenu()
    const [childA] = await renderFirstChildren(renderResult)

    const spans = childA.querySelectorAll('span.material-icons')

    expect(spans).toHaveLength(2)
    expect(spans[0]).toHaveClass('test-class1')
    expect(spans[1]).toHaveClass('test-class2')
  })

  test('children indicator defaults to chevron', async () => {
    expect.assertions(2)

    const renderResult = renderMenu()
    const [, childB] = await renderFirstChildren(renderResult)
    const spans = childB.querySelectorAll('span.material-icons')

    expect(spans).toHaveLength(1)
    expect(spans[0]).toHaveClass('fa-chevron-right')
  })

  test('down indicator can be set', async () => {
    expect.assertions(2)

    const renderResult = render(
      <HorizontalNavigationMenu
        data={menuData}
        childIndicatorIcon="test-class"
      />
    )
    const [, childB] = await renderFirstChildren(renderResult)
    const spans = childB.querySelectorAll('span.material-icons')

    expect(spans).toHaveLength(1)
    expect(spans[0]).toHaveClass('test-class')
  })
})
