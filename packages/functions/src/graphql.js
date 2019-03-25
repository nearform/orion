const https = require('https')

module.exports = function(queryOrMutation) {
  const body = JSON.stringify({ query: queryOrMutation })

  return new Promise((resolve, reject) => {
    const request = https.request(
      {
        hostname: 'knowledgebase-hasura.herokuapp.com',
        path: '/v1alpha1/graphql',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(body),
          'x-hasura-admin-secret': 'azPS7MbM5cHa',
        },
      },
      res => {
        res.setEncoding('utf8')

        const data = []

        res.on('error', err => reject(err))

        res.on('data', d => data.push(d))

        res.on('end', () =>
          resolve({
            statusCode: res.statusCode,
            body: JSON.parse(data.join('')),
          })
        )
      }
    )

    request.on('error', err => reject(err))

    request.write(body)
    request.end()
  })
}
