import React from 'react'
import PropTypes from 'prop-types'
import {
  TableRow,
  TableCell,
  IconButton,
  withStyles,
  Checkbox,
} from '@material-ui/core'
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile'
import { Link, useStaticQuery, graphql } from 'gatsby'
import { useMutation, useQuery } from 'graphql-hooks'

import SEO from '../SEO'
import ContentToolbar from './ContentToolbar'

import { updateArticleMutation } from '../../queries'

import QueryTable from '../QueryTable'
import { getArticlesData } from '../../queries'

import { formatDateTime } from '../../utils/date'
import get from 'lodash/get'
import FeatureArticles from '../list/FeatureArticles'

const headers = [
  { id: 'title', label: 'Title', sortable: true },
  { id: 'createdBy', label: 'Created By' },
  { id: 'updated_at', label: 'Last Updated', sortable: true },
  { id: 'knowledge_type', label: 'Type', sortable: true },
  {
    id: 'editorsPicks',
    label: "Editor's Picks",
    cellProps: { align: 'center' },
  },
  { id: 'view', label: 'View', cellProps: { align: 'center' } },
]

const EditorsPicks = ({ classes }) => {
  const [updateEditorsPick] = useMutation(updateArticleMutation)

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

  const {
    data: { article: editorsPicks = [] } = {},
    refetch: refetchEditorsPicks,
  } = useQuery(getArticlesData, {
    variables: {
      editorsPick: true,
      offset: 0,
      limit: 3,
      orderBy: { updated_at: 'desc' },
    },
  })

  const toggleEditorPick = async (id, editors_pick) =>
    await updateEditorsPick({
      variables: {
        id,
        changes: {
          editors_pick,
        },
      },
    })

  return (
    <>
      <SEO pageTitle="Editor's Picks" />
      <ContentToolbar pageTitle="Content" />
      <FeatureArticles title="Editors' Picks Preview" articles={editorsPicks} />
      <QueryTable
        headers={headers}
        query={getArticlesData}
        variables={{ status: 'published' }}
        orderBy={{ updated_at: 'desc' }}
        renderTableBody={(data, refetchArticles) =>
          data &&
          data.article.map(article => (
            <TableRow hover key={article.id} size="small">
              <TableCell>{article.title}</TableCell>
              <TableCell>
                {article.createdBy.first_name} {article.createdBy.last_name}
              </TableCell>
              <TableCell>{formatDateTime(article.updated_at)}</TableCell>
              <TableCell>{knowledgeTypes[article.knowledge_type]}</TableCell>
              <TableCell align="center">
                <Checkbox
                  color="default"
                  checked={article.editors_pick}
                  onChange={async (event, checked) => {
                    await toggleEditorPick(article.id, checked)
                    refetchEditorsPicks()
                    refetchArticles()
                  }}
                  disabled={!article.editors_pick && editorsPicks.length > 2}
                />
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
    </>
  )
}

EditorsPicks.propTypes = {
  classes: PropTypes.object,
  setPageTitle: PropTypes.func,
}

const styles = theme => ({
  icon: {
    ...theme.iconLight,
  },
})

export default withStyles(styles)(EditorsPicks)
