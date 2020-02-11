import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { jsxDecorator } from 'storybook-addon-jsx'
import { text, select, number, boolean } from '@storybook/addon-knobs'

import ListItem from '.'

storiesOf('CustomListItem', module)
  .addDecorator(jsxDecorator)
  .add('Link', () => (
    <ListItem
      label={text('Label', 'Articles')}
      to={select(
        'Link Path',
        ['/link-matches-current-path', '/link-doesnt-match-current-path'],
        '/link-doesnt-match-current-path'
      )}
      currentPath="/link-matches-current-path"
      iconClass="fas fa-newspaper"
      depthLevel={number('Depth level (non-nested or no parents = 0)', 0)}
      depthIndent={number('Level indent value in px', 20)}
      hasActionHighlight={boolean('Has Action Highlight', false)}
    />
  ))
  .add('onClick', () => (
    <ListItem
      label={text('Label', 'Click for Alert')}
      currentPath="/link-matches-current-path"
      iconClass="fas fa-exclamation-triangle"
      depthLevel={number('Depth level (non-nested or no parents = 0)', 0)}
      depthIndent={number('Level indent value in px', 20)}
      hasActionHighlight={boolean('Has Action Highlight', false)}
      onClick={() => {
        // eslint-disable-next-line no-alert
        alert('Hello! I am an alert box triggered by onClick!!')
      }}
    />
  ))
  .add('hasChildren', () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
      <ListItem
        label={text('Label', 'Articles')}
        to={select(
          'Link Path',
          ['/link-matches-current-path', '/link-doesnt-match-current-path'],
          '/link-doesnt-match-current-path'
        )}
        currentPath="/link-matches-current-path"
        iconClass="fas fa-newspaper"
        depthLevel={number('Depth level (non-nested or no parents = 0)', 0)}
        depthIndent={number('Level indent value in px', 20)}
        hasActionHighlight={boolean('Has Action Highlight', false)}
        isOpen={isOpen}
        handleOpen={() => setIsOpen(!isOpen)}
      />
    )
  })
