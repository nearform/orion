import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { TableRow, TableCell, IconButton, withStyles } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile'
import { Link } from 'gatsby'

import { ArticleStatusChip } from 'components'
import useKnowledgeTypes from '../../hooks/useKnowledgeTypes'

import QueryTable from '../QueryTable'
import { getArticlesData, getUserArticlesData } from '../../queries'

import { useUserId, useIsPlatformGroup } from '../../utils/auth'
import { formatDateTime } from '../../utils/date'
import ContentToolbar from './ContentToolbar'
import SEO from '../SEO'

const ArticleList = ({ classes, path }) => {
  const [statusFilter, setStatusFilter] = useState()
  const [pageTitle, setPageTitle] = useState()
  useEffect(() => {
    const inReview = path === '/needs-review'
    setStatusFilter(inReview ? 'in-review' : undefined)
    setPageTitle(inReview ? 'Needs Review' : 'All Stories')
  }, [path])
  const isPlatformGroup = useIsPlatformGroup()
  const userId = useUserId()
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
    { id: 'view', label: 'View', cellProps: { align: 'center' } },
  ]

  if (!isPlatformGroup) {
    headers.splice(1, 1)
  }

  return (
    <>
      <SEO pageTitle={pageTitle} />
      <ContentToolbar pageTitle="Content" />
      <QueryTable
        headers={headers}
        query={query}
        variables={variables}
        orderBy={{ updated_at: 'desc' }}
        renderTableBody={data =>
          data &&
          data.article.map(article => (
            <TableRow hover key={article.id} size="small">
              <TableCell>{article.title}</TableCell>
              {isPlatformGroup && (
                <TableCell>
                  {article.createdBy.first_name} {article.createdBy.last_name}
                </TableCell>
              )}
              <TableCell>{formatDateTime(article.updated_at)}</TableCell>
              <TableCell>{knowledgeTypes[article.knowledge_type]}</TableCell>
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
                {article.status === 'published' && (
                  <IconButton
                    className={classes.icon}
                    component={Link}
                    to={`/content/${article.path}`}
                  >
                    <InsertDriveFileIcon />
                  </IconButton>
                )}
              </TableCell>
            </TableRow>
          ))
        }
      />
    </>
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
