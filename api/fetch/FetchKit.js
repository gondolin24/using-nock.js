const fetch = require('node-fetch')

class FetchKit {

    async getRandomApi() {
        const resp = await fetch('https://wikimedia.org/api/rest_v1/?spec', {
            // These properties are part of the Fetch Standard
            method: 'GET'
        })

        return resp.json()
    }

}

module.exports = FetchKit
