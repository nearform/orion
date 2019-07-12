import React from 'react'
import PropTypes from 'prop-types'
import { TableRow, TableCell, IconButton, withStyles } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile'
import { PaddedContainer } from 'components'
import { Link, useStaticQuery, graphql } from 'gatsby'

import { ArticleStatusChip } from 'components'

import QueryTable from '../components/QueryTable'
import { getArticlesData, getUserArticlesData } from '../queries'
import SEO from './SEO'

import { useUserId, useIsPlatformGroup } from '../utils/auth'
import { formatDate } from '../utils/date'
import get from 'lodash/get'
import ContentToolbar from './ContentToolbar'

const headers = [
  { id: 'title', label: 'Title', sortable: true },
  { id: 'createdBy', label: 'Created By' },
  { id: 'updated_at', label: 'Last Updated', sortable: true },
  { id: 'knowledge_type', label: 'Type', sortable: true },
  { id: 'status', label: 'Status', sortable: true },
  { id: 'edit', label: 'Edit', cellProps: { align: 'center' } },
  { id: 'view', label: 'View', cellProps: { align: 'center' } },
]

const MyContentRoute = ({ classes }) => {
  const isPlatformId = useIsPlatformGroup()
  const userId = useUserId()
  const staticResult = useStaticQuery(graphql`
    {
      allKnowledgeTypes(sort: { fields: orderIndex, order: ASC }) {
        nodes {
          name
          key
        }
      }
    }
  `)
  const knowledgeTypes = get(staticResult, 'allKnowledgeTypes.nodes').reduce(
    (acc, { key, name }) => {
      acc[key] = name
      return acc
    },
    {}
  )

  let query
  let variables

  if (isPlatformId) {
    query = getArticlesData
    variables = {}
  } else {
    query = getUserArticlesData
    variables = { createdById: userId }
  }

  return (
    <PaddedContainer>
      <SEO title="My Content" />
      <ContentToolbar pageTitle="Content" />
      <QueryTable
        headers={headers}
        query={query}
        variables={variables}
        orderBy={{ updated_at: 'desc' }}
        renderTableBody={data =>
          data &&
          data.article.map((article, index) => (
            <TableRow hover key={index} size="small">
              <TableCell>{article.title}</TableCell>
              <TableCell>
                {article.createdBy.first_name} {article.createdBy.last_name}
              </TableCell>
              <TableCell>{formatDate(article.updated_at)}</TableCell>
              <TableCell>{knowledgeTypes[article.knowledge_type]}</TableCell>
              <TableCell>
                <ArticleStatusChip status={article.status} />
              </TableCell>
              <TableCell align="center" padding="none">
                <IconButton
                  className={classes.icon}
                  component={Link}
                  to={`/submit/${article.id}`}
                >
                  <EditIcon />
                </IconButton>
              </TableCell>
              <TableCell align="center" padding="none">
                <IconButton
                  className={classes.icon}
                  component={Link}
                  to={`/content/${article.path}`}
                >
                  <InsertDriveFileIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))
        }
      />
    </PaddedContainer>
  )
}

MyContentRoute.propTypes = {
  classes: PropTypes.object,
}

const styles = theme => ({
  icon: {
    color: theme.articleTableIconColor,
  },
})

export default withStyles(styles)(MyContentRoute)
