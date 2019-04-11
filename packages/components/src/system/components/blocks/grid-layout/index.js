import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { breakpoint, display, width } from 'saluki'

const Item = styled.div`
  ${width('full')}
  ${({ span, style, gutter }) =>
    breakpoint('small', [
      {
        width: getWidth(span, 'small', gutter),
        marginLeft: `${gutter}px`,
        ...style,
      },
    ])}
  ${({ span, style, gutter }) =>
    breakpoint('medium', [
      {
        width: getWidth(span, 'medium', gutter),
        marginLeft: `${gutter}px`,
        ...style,
      },
    ])}
  ${({ span, style, gutter }) =>
    breakpoint('large', [
      {
        width: getWidth(span, 'large', gutter),
        marginLeft: `${gutter}px`,
        ...style,
      },
    ])}
  ${({ span, style, gutter }) =>
    breakpoint('max', [
      {
        width: getWidth(span, 'max', gutter),
        marginLeft: `${gutter}px`,
        ...style,
      },
    ])}
`

Item.defaultProps = {
  gutter: 0,
}

const StyledContainer = styled.div`
  ${display('flex')}
  flex-wrap: wrap;
  ${({ gutter }) => `margin-left: -${gutter}px;`}
`

StyledContainer.defaultProps = {
  gutter: 0,
}

const getWidth = (span, screenWidth, gutter) => {
  const columnSpan = {
    xsmall: 1,
    small: 6,
    medium: 6,
    large: 12,
    max: 12,
  }
  if (!span) return `calc(8.33% - ${gutter}px)`

  const width = (span / columnSpan[screenWidth]) * 100
  return `calc(${width}% - ${gutter}px)`
}

const Container = ({ children, gutter }) => {
  return (
    <StyledContainer gutter={gutter}>
      {React.Children.map(children, child =>
        React.cloneElement(child, {
          gutter,
        })
      )}
    </StyledContainer>
  )
}

Container.defaultProps = {
  gutter: 0,
}

Container.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
  gutter: PropTypes.number,
}

const Grid = props => {
  switch (true) {
    case props.container === true:
      return React.createElement(Container, props)
    case props.item === true:
      return React.createElement(Item, props)
    default:
      return null
  }
}

Grid.propTypes = {
  container: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.instanceOf(undefined),
  ]),
  item: PropTypes.oneOfType([PropTypes.bool, PropTypes.instanceOf(undefined)]),
}

export default Grid
