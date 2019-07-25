import React, { useState } from 'react'
import { getArticlesData } from '../../../queries'
import CloseIcon from '@material-ui/icons/Close'
import FilterListIcon from '@material-ui/icons/FilterList'
import { TypedChip } from 'components'
import debounce from 'lodash/debounce'
import QueryTable from '../../QueryTable'
import { useStaticQuery, graphql } from 'gatsby'
import {
  Typography,
  withStyles,
  Button,
  Input,
  TableRow,
  TableCell,
} from '@material-ui/core'
import get from 'lodash/get'

const headers = [
  { id: 'title', label: 'Title', sortable: true },
  { id: 'createdBy', label: 'Author' },
  { id: 'knowledge_type', label: 'Type', sortable: true },
  { id: 'select', label: '', sortable: true },
]

function SelectArticleRecommendations({
  classes,
  selectedArticles = [],
  onChange,
}) {
  const [isTableOpen, setTableOpen] = useState(false)
  const [filter, setFilter] = useState()

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

  function addArticle(article) {
    onChange([...selectedArticles, { recommended_article: article }])
  }

  function removeArticle(articleId) {
    onChange(
      selectedArticles.filter(
        ({ recommended_article }) => recommended_article.id !== articleId
      )
    )
  }

  const queryVariables = {
    status: 'published',
  }
  if (filter) {
    //implement fuzzy search:
    //https://docs.hasura.io/1.0/graphql/manual/queries/custom-functions.html#example-fuzzy-match-search-functions
    queryVariables.titleLike = `%${filter}%`
  }

  const handleFilterChange = debounce(value => {
    setFilter(value)
  }, 400)
  return (
    <>
      <div className={classes.articleList}>
        {selectedArticles.map(({ recommended_article }) => (
          <TypedChip
            key={recommended_article.id}
            color="primary"
            name={recommended_article.title}
            onDelete={() => removeArticle(recommended_article.id)}
            type={knowledgeTypes[recommended_article.knowledge_type]}
          />
        ))}
      </div>
      {!isTableOpen ? (
        <Button
          variant="outlined"
          color="secondary"
          className={classes.openButton}
          onClick={() => setTableOpen(true)}
        >
          Add
        </Button>
      ) : (
        <div>
          <div className={classes.filter}>
            <Input
              endAdornment={<FilterListIcon color="secondary" />}
              onChange={e => handleFilterChange(e.target.value)}
            />
            <Button
              color="secondary"
              onClick={() => setTableOpen(false)}
              className={classes.closeButton}
            >
              Close
              <CloseIcon />
            </Button>
          </div>
          <div>
            <QueryTable
              headers={headers}
              query={getArticlesData}
              variables={queryVariables}
              orderBy={{ id: 'desc' }}
              pageSizes={[5]}
              renderTableBody={data =>
                data &&
                data.article.map(article => (
                  <TableRow key={article.id}>
                    <TableCell>{article.title}</TableCell>
                    <TableCell>
                      <Typography>
                        {article.createdBy.first_name}{' '}
                        {article.createdBy.last_name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {get(knowledgeTypes, article.knowledge_type)}
                    </TableCell>
                    <TableCell>
                      <Button
                        color="secondary"
                        variant="outlined"
                        disabled={
                          selectedArticles.some(
                            ({ recommended_article }) =>
                              recommended_article.id === article.id
                          ) || selectedArticles.length > 2
                        }
                        onClick={() => addArticle(article)}
                      >
                        Add
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              }
            />
          </div>
        </div>
      )}
    </>
  )
}

export default withStyles(theme => ({
  articleList: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: theme.spacing(-0.5),
    marginBottom: theme.spacing(0.5),
    '&>div': {
      margin: theme.spacing(0.5),
    },
  },
  openButton: {
    marginTop: theme.spacing(1),
  },
  closeButton: {
    '& svg': {
      marginLeft: theme.spacing(1),
    },
  },
  filter: {
    display: 'flex',
    marginBottom: theme.spacing(2),
    justifyContent: 'space-between',
    '&>h4': {
      marginBottom: theme.spacing(0.5),
    },
    '& input': {
      minWidth: '250px',
    },
    '&>div': {
      paddingRight: theme.spacing(0.5),
    },
  },
}))(SelectArticleRecommendations)
