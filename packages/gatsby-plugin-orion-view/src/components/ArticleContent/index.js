import React from 'react'
import T from 'prop-types'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  withStyles,
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

function ArticleContent({ classes, content, image, subtitle, title }) {
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
      {image && <img src={image} className={classes.image} />}
      <div className={classes.content}>
        <ReactMarkdown renderers={renderers} source={content} />
      </div>
    </div>
  )
}

const styles = theme => ({ ...theme.articleContent })

ArticleContent.propTypes = {
  classes: T.object,
  content: T.string.isRequired,
  image: T.string,
  subtitle: T.string,
  title: T.string.isRequired,
}

export default withStyles(styles, { withTheme: true })(ArticleContent)
