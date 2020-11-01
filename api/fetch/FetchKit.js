const fetch = require('node-fetch')

class FetchKit {

    async getRandomApi() {
        const resp = await fetch('https://wikimedia.org/api/rest_v1/?spec', {
            method: 'GET'
        })

        return resp.json()
    }

}

module.exports = FetchKit
