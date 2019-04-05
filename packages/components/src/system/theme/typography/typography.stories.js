import React from 'react'

import { storiesOf } from '@storybook/react'

storiesOf('System/Typography/Headings', module)
  .add('Basic Header 1 Example', () => <h1>Header level 1</h1>)
  .add('Basic Header 2 Example', () => <h2>Header level 2</h2>)
  .add('Basic Header 3 Example', () => <h3>Header level 3</h3>)
  .add('Basic Header 4 Example', () => <h4>Header level 4</h4>)
  .add('Basic Header 5 Example', () => <h5>Header level 5</h5>)
  .add('Basic Header 6 Example', () => <h6>Header level 6</h6>)
  .add('Basic Paragraph Example', () => (
    <p>Omnis id corrupti iusto sit similique qui amet.</p>
  ))
  .add('Basic Button Example', () => <button>Sample Button Text</button>)
