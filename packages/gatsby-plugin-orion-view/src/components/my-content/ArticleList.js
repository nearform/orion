import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  TableRow,
  TableCell,
  IconButton,
  withStyles,
} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile'
import { Link } from 'gatsby'
import { useMutation } from 'graphql-hooks'
import get from 'lodash/get'

import { ArticleStatusChip, AuthContext, PaddedContainer } from 'components'
import {
  deleteArticleMutation,
  getArticlesData,
  getUserArticlesData,
} from 'gatsby-plugin-orion-core/queries'
import useKnowledgeTypes from 'gatsby-plugin-orion-core/hooks/useKnowledgeTypes'
import SEO from '../SEO'

import QueryTable from '../QueryTable'

import { formatDateTime } from '../../utils/date'
import ContentToolbar from './ContentToolbar'

const ArticleList = ({ classes, path }) => {
  const { getUserTokenData } = useContext(AuthContext)
  const { userId, isPlatformGroup } = getUserTokenData()
  const [statusFilter, setStatusFilter] = useState()
  const [deleteDialog, setDeleteDialog] = useState(null)
  const [pageTitle, setPageTitle] = useState('All Stories')
  const [deleteArticle] = useMutation(deleteArticleMutation)

  useEffect(() => {
    const inReview = path === '/needs-review'
    setStatusFilter(inReview ? 'in-review' : undefined)
    setPageTitle(inReview ? 'Needs Review' : 'All Stories')
  }, [path])

  const knowledgeTypes = useKnowledgeTypes()

  let query
  let variables

  if (isPlatformGroup) {
    query = getArticlesData
    variables = { status: statusFilter }
  } else {
    query = getUserArticlesData
    variables = { createdById: userId }
  }

  const headers = [
    { id: 'title', label: 'Title', sortable: true },
    { id: 'createdBy', label: 'Created By' },
    { id: 'updated_at', label: 'Last Updated', sortable: true },
    { id: 'knowledge_type', label: 'Type', sortable: true },
    { id: 'status', label: 'Status', sortable: true },
    { id: 'edit', label: 'Edit', cellProps: { align: 'center' } },
    { id: 'delete', label: 'Delete', cellProps: { align: 'center' } },
    { id: 'view', label: 'View', cellProps: { align: 'center' } },
  ]

  if (!isPlatformGroup) {
    headers.splice(1, 1)
  }

  return (
    <PaddedContainer>
      <SEO title={pageTitle} />
      <ContentToolbar pageTitle="Content" />
      <QueryTable
        headers={headers}
        query={query}
        variables={variables}
        orderBy={
          // eslint-disable-next-line camelcase
          { updated_at: 'desc' }
        }
        renderTableBody={(data, refetch) => (
          <>
            {data &&
              data.article.map(article => (
                <TableRow key={article.id} hover size="small">
                  <TableCell>{article.title}</TableCell>
                  <TableCell>
                    {isPlatformGroup && (
                      <>
                        {get(article, 'authors.author.first_name')}{' '}
                        {get(article, 'authors.author.last_name')}
                      </>
                    )}
                  </TableCell>
                  <TableCell>{formatDateTime(article.updated_at)}</TableCell>
                  <TableCell>
                    {knowledgeTypes[article.knowledge_type]}
                  </TableCell>
                  <TableCell>
                    <ArticleStatusChip status={article.status} />
                  </TableCell>
                  <TableCell align="center" padding="none">
                    <IconButton
                      className={classes.icon}
                      component={Link}
                      disabled={
                        article.status !== 'in-progress' && !isPlatformGroup
                      }
                      to={`/my-content/edit/${article.id}`}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align="center" padding="none">
                    <IconButton
                      className={classes.icon}
                      onClick={() => setDeleteDialog(article)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align="center" padding="none">
                    <IconButton
                      className={classes.icon}
                      component={Link}
                      to={`/my-content/preview/${article.id}`}
                    >
                      <InsertDriveFileIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            <Dialog
              open={deleteDialog !== null}
              onClose={() => setDeleteDialog(null)}
            >
              <DialogTitle id="alert-dialog-title">Delete Article?</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Are you sure you want to delete this article?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button color="secondary" onClick={() => setDeleteDialog(null)}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onClick={async () => {
                    if (deleteDialog !== null) {
                      await deleteArticle({
                        variables: { articleId: deleteDialog.id },
                      })
                      setDeleteDialog(null)
                      refetch()
                    }
                  }}
                >
                  Delete Article
                </Button>
              </DialogActions>
            </Dialog>
          </>
        )}
      />
    </PaddedContainer>
  )
}

ArticleList.propTypes = {
  classes: PropTypes.object,
  path: PropTypes.string,
}

const styles = theme => ({
  icon: {
    ...theme.iconLight,
  },
})

export default withStyles(styles)(ArticleList)
