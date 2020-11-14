const nock = require('nock')
const fs = require('fs')
var express = require('express');
var router = express.Router();
const FetchKit = require('../fetch/FetchKit')
const {decode} = require('./Decoder')
const bottle = require('../bottle-js/BottleService')

router.get('/nock-run-black-box-two', async function (req, res, next) {
    nock('https://en.wikipedia.org')
        .get('/api/rest_v1/page/random/summary')
        .reply(200, {
            food: 'Boil water and leave it to cool'
        })
    const fetchKit = new FetchKit()
    const response = await fetchKit.getRandomWiki()
    //NEEDED  SO MOCK DOES NOT SPILL INTO OTHER CALLS
    //THINK OF THIS LIKE JEST BEFORE ALL
    nock.cleanAll()
    res.json(response)

});

router.get('/get-random-wiki-bottle', async function (req, res, next) {
    try {
        const response = await bottle.container.WIKI.getRandomWiki()
        //standard
        res.json(response)
    } catch (e) {
        next(e)
    }
});


//this does not work
router.get('/get-random-wiki-bottle-factory', async function (req, res, next) {
    try {
        const response = bottle.container.DomainObject('hello').getData()
        //standard
        res.json(response)
    } catch (e) {
        next(e)
    }
});


router.get('/get-random-wiki', async function (req, res, next) {
    const fetchKit = new FetchKit()
    const response = await fetchKit.getRandomWiki()
    //standard
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
//standard
    res.json(response)
});

module.exports = router;
