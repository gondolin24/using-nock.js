const fetch = require('node-fetch')

class FetchKit {

    async getRandomApi() {
        const resp = await fetch('https://en.wikipedia.org/api/rest_v1/page/random/summary', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'content-encoded': 'deflate, gzip',
                "Accept": "application/json,text/*;q=0.99"
            }
        })

        return resp.json()
    }

}

module.exports = FetchKit
