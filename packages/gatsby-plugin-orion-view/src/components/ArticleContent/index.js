import React from 'react'
import T from 'prop-types'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  makeStyles,
} from '@material-ui/core'
import ReactMarkdown from 'react-markdown'

const renderers = {
  heading: ({ level, children }) => (
    <Typography variant={`h${level}`}>{children}</Typography>
  ),
  paragraph: ({ children }) => (
    <Typography variant="body1">{children}</Typography>
  ),
  table: ({ children }) => <Table>{children}</Table>,
  tableHead: ({ children }) => <TableHead>{children}</TableHead>,
  tableBody: ({ children }) => <TableBody>{children}</TableBody>,
  tableRow: ({ children }) => <TableRow>{children}</TableRow>,
  tableCell: ({ align, children }) => (
    <TableCell align={align || 'left'}>{children}</TableCell>
  ),
}

const useStyles = makeStyles(theme => ({
  content: {
    '& h1': {
      ...theme.typography.h1,
      marginBottom: 16,
    },
    '& h2': {
      ...theme.typography.h2,
      marginBottom: 16,
    },
    '& h3': {
      ...theme.typography.h3,
      marginBottom: 16,
    },
    '& h4': {
      ...theme.typography.h4,
      marginBottom: 16,
    },
    '& h5': {
      ...theme.typography.h5,
      marginBottom: 16,
    },
    '& p': {
      ...theme.typography.body1,
      fontSize: '16px',
      lineHeight: '22px',
      marginBottom: 16,
      '&:first-of-type': {
        fontSize: '21px',
        lineHeight: '28px',
      },
    },
    '& li': {
      ...theme.typography.body1,
      fontSize: '16px',
      lineHeight: '22px',
      marginBottom: 16,
    },
    '& blockquote': {
      ...theme.typography.body1,
      alignItems: 'flex-start',
      display: 'flex',
      fontSize: '16px !important',
      fontStyle: 'italic',
      margin: 0,
      '&:before': {
        backgroundColor: theme.palette.secondary.main,
        borderRadius: 8,
        content: '""',
        display: 'block',
        height: 33,
        marginLeft: 16,
        marginRight: 16,
        width: 8,
      },
      '& *': {
        fontSize: '16px !important',
      },
    },
    '& ol': {
      counterReset: 'ol',
      listStyle: 'none',
      marginLeft: 16,
      padding: 0,
      '& li': {
        counterIncrement: 'ol',
        '&:before': {
          content: 'counter(ol) "."',
          marginRight: 16,
        },
      },
    },
  },
  image: {
    width: '100%',
    marginBottom: 16,
  },
  title: {
    ...theme.typography.h1,
    marginBottom: 16,
  },
  subtitle: {
    ...theme.typography.h2,
    marginBottom: 16,
  },
}))

function ArticleContent({ content, image, subtitle, title }) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Typography variant="h1" className={classes.title}>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="h2" className={classes.subtitle}>
          {subtitle}
        </Typography>
      )}
      {image && <img alt={title} src={image} className={classes.image} />}
      <div className={classes.content}>
        <ReactMarkdown renderers={renderers} source={content} />
      </div>
    </div>
  )
}

ArticleContent.propTypes = {
  content: T.string.isRequired,
  image: T.string,
  subtitle: T.string,
  title: T.string.isRequired,
}

ArticleContent.defaultProps = {
  image: '',
  subtitle: '',
}

export default ArticleContent
