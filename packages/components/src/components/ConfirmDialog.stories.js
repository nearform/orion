import React, { useState } from 'react'

import { storiesOf } from '@storybook/react'
import { jsxDecorator } from 'storybook-addon-jsx'

import { Chip, IconButton, Card, withStyles } from '@material-ui/core'

import DeleteIcon from '@material-ui/icons/DeleteForever'
import AddIcon from '@material-ui/icons/ExposurePlus1'
import ConfirmDialog from './ConfirmDialog'

const Items = withStyles(theme => ({
  root: {
    flexDirection: 'row-reverse',
    padding: theme.spacing(1, 2),
    margin: theme.spacing(3),
  },
}))(({ classes }) => {
  const [itemCount, setItemCount] = useState(4)
  return (
    <Card className={classes.root}>
      <span>
        {new Array(itemCount + 1).fill().map((_, num) => (
          <DeletableItem key={`item_${num + 1}`} title={`Item #${num + 1}`} />
        ))}
      </span>

      <ConfirmDialog
        title="Create a new item?"
        text={`This new item will have the label "Item #${itemCount + 2}"`}
        onConfirm={() => setItemCount(itemCount + 1)}
      >
        <IconButton>
          <AddIcon />
        </IconButton>
      </ConfirmDialog>
    </Card>
  )
})

const DeletableItem = withStyles(() => ({
  root: {
    flexDirection: 'row-reverse',
  },
}))(({ classes, title }) => {
  const [isDeleted, setIsDeleted] = useState(false)

  const DeleteButton = () => (
    <ConfirmDialog
      title={`Delete "${title}"?`}
      text="This item will be permanently deleted. This action cannot be undone."
      okayLabel="Delete"
      onConfirm={() => setIsDeleted(true)}
    >
      <IconButton>
        <DeleteIcon />
      </IconButton>
    </ConfirmDialog>
  )

  return isDeleted ? (
    ''
  ) : (
    <Chip className={classes.root} label={title} icon={<DeleteButton />} />
  )
})

storiesOf('ConfirmDialog', module)
  .addDecorator(jsxDecorator)
  .add('Add and delete', () => <Items />)
