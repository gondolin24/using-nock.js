const nock = require('nock')
const fs = require('fs')
var express = require('express');
var router = express.Router();
const FetchKit = require('../fetch/FetchKit')
const {decode} = require('./Decoder')

router.get('/nock-run=black-box', function (req, res, next) {
    nock('https://wikimedia.org')
        .get('/api/rest_v1/page/random/summary')
        .reply(200, {
            test: 'nock'
        })

});
router.get('/nock-record', async function (req, res, next) {
    nock.recorder.rec({
        output_objects: true
    })

    const fetchKit = new FetchKit()
    const response = await fetchKit.getRandomApi()
    nock.restore()
    const nockCalls = nock.recorder.play()
    await nockCalls.forEach(async (item) => {
        const {status, response} = item
        if (status === 200) {
            const rr = decode(response)
            await fs.writeFileSync(`${__dirname}+/temp.json`, JSON.stringify(rr), function () {
            })
        }
    })

    res.json(response)
});

module.exports = router;
