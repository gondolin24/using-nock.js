const nock = require('nock')
const fs = require('fs')
var express = require('express');
var router = express.Router();
const FetchKit = require('../fetch/FetchKit')
const {decode} = require('./Decoder')
const recorded = require('./recorded-file')

router.get('/nock-run-black-box-one', async function (req, res, next) {

    nock('https://wikimedia.org')
        .get('/')
        .reply(200, {body: recorded})

    const fetchKit = new FetchKit()
    const response = await fetchKit.getRandomWiki()
    res.json(response)
});

router.get('/nock-run-black-box-two', async function (req, res, next) {
    nock('https://wikimedia.org')
        .get('/')
        .reply(200, {
            food: 'Boil water and leave it to cool'
        })
    const fetchKit = new FetchKit()
    const response = await fetchKit.getRandomWiki()

    res.json(response)

});


router.get('/get-random-wiki', async function (req, res, next) {
    const fetchKit = new FetchKit()
    const response = await fetchKit.getRandomWiki()

    res.json(response)
});


router.get('/nock-record', async function (req, res, next) {
    //flag needed to parse and save later
    nock.recorder.rec({
        output_objects: true
    })

    const fetchKit = new FetchKit()
    const response = await fetchKit.getRandomWiki()
    nock.restore()
    const nockCalls = nock.recorder.play()


    await nockCalls.forEach(async (item) => {
        const {status, response, path} = item
        //write file to local directory to be called later
        if (status === 200) {
            //decoder needed. Unable to decode with vanilla js
            const decoded = decode(response)
            await fs.writeFileSync(`${__dirname}\\recorded-file.json`, JSON.stringify(decoded), function () {
            })
        }
    })

    res.json(response)
});

module.exports = router;
