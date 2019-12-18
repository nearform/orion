#!/usr/bin/env node

/*eslint no-console: ["error", { allow: ["log", "error"] }] */

const https = require('https')
const FS = require('fs')
const Path = require('path')

// Resolve cli args.
const [
  ,
  scriptPath,
  // Where to write the result.
  outPath = Path.resolve(
    Path.dirname(scriptPath),
    '../src/components/list/event-list/events.js'
  ),
  // Where to read events from.
  eventsURL = 'https://www.efqm.org/index.php/wp-json/tribe/events/v1/events',
] = process.argv

// Fetch event data.
console.log('Fetching %s...', eventsURL)
fetchPage(eventsURL)
  .then(events => {
    // Write data to out file.
    console.log('Writing to %s...', outPath)
    FS.writeFileSync(
      outPath,
      `export default ${JSON.stringify(events, null, 4)}`
    )
  })
  .catch(console.error)

/**
 * Fetch a page of event data from the REST API.
 * The function tail-recursively fetches any and all pages after the current one.
 * @param url       The URL to fetch.
 * @param results   An array of event data accumulated from previous page fetches.
 * @param page      The number of the previously fetched page.
 */
function fetchPage(url, results = [], page = 0) {
  return new Promise((resolve, reject) => {
    https
      .get(url, res => {
        // Check that response looks OK.
        const { statusCode, statusMessage, headers } = res
        if (res.statusCode !== 200) {
          return reject(`Status error ${statusCode} ${statusMessage}`)
        }
        const contentType = headers['content-type']
        if (!/application\/json/.test(contentType)) {
          return reject(
            `Server responded with non-JSON content type: ${contentType}`
          )
        }
        console.log('  page %d', ++page)
        // Read page into buffer.
        const buffer = []
        res.on('data', data => buffer.push(data))
        res.on('end', () => {
          // Parse page data and extract event info.
          const json = Buffer.concat(buffer).toString()
          const { events, next_rest_url } = JSON.parse(json)
          results = results.concat(
            events.map(event => {
              const {
                id,
                title,
                url,
                start_date,
                end_date,
                venue: { url: venueLink, venue: venueText },
                website = '',
              } = event
              return {
                uid: `event-${id}`,
                name: title.replace(/&#(\d+);/g, (m, r) =>
                  String.fromCharCode(Number(r))
                ),
                startTime: start_date,
                endTime: end_date,
                location: {
                  link: venueLink,
                  text: venueText,
                },
                bookingLink: website,
                detailsLink: url,
              }
            })
          )
          // Fetch the next page, if any; otherwise return the accumulated results.
          if (next_rest_url) {
            resolve(fetchPage(next_rest_url, results, page))
          } else {
            resolve(results)
          }
        })
      })
      .on('error', reject)
  })
}
