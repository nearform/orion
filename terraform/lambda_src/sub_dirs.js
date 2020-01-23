'use strict'

const defaultDocument = 'index.html'

exports.handler = (event, context, callback) => {
    const request = event.Records[0].cf.request

    if(request.uri != "/") {
        const paths = request.uri.split('/')
        const lastPath = paths[paths.length - 1]
        const isFile = lastPath.split('.').length > 1
        if(!isFile) {
            if(lastPath != "") {
                request.uri += "/"
            }
            request.uri += defaultDocument
        }
    }

    return callback(null, request)
}