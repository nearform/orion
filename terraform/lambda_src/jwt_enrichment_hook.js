// Dummy function code replaced by CI build

exports.handler = (event, context, callback) => {
    const request = event.Records[0].cf.request
    return callback(null, request)
}