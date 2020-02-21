import React from 'react'
import { storiesOf } from '@storybook/react'
import { jsxDecorator } from 'storybook-addon-jsx'
import { text } from '@storybook/addon-knobs'
import ArticleContent from '.'

const defaultContent = `# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5

Body text - first paragraph.

> Block quote

Body text with _italics_, *bold* text and a [link](https://orion.nearform.com/).

* Bulleted list
* Bulleted list
* Bulleted list

1. Numbered list
2. Numbered list
3. Numbered list

![Image](https://www.nearform.com/wp-content/uploads/2018/06/nearform-logo-2.png)

This paragraph has some \`inline code\`.

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |`

storiesOf('ArticleContent', module)
  .addDecorator(jsxDecorator)
  .add(
    'Interactive',
    () => {
      return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ maxWidth: 640 }}>
            <ArticleContent
              content={text('Content', defaultContent)}
              image={text(
                'Image URL',
                'https://images.unsplash.com/photo-1509225770129-fbcf8a696c0b'
              )}
              subtitle={text('Subtitle', 'This is a subtitle')}
              title={text(
                'Title',
                '2020 sparks a year of new innovations for Orion and their user base'
              )}
            />
          </div>
        </div>
      )
    },
    {
      knobs: {
        escapeHTML: false,
      },
    }
  )
