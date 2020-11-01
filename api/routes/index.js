var express = require('express');
var router = express.Router();
const FetchKit = require('../fetch/FetchKit')


router.get('/carrots', function(req, res, next) {
  res.json({
    color:'orange'
  })
});
router.get('/apples', async function(req, res, next) {
  const fetchKit = new FetchKit()
  const response = await fetchKit.getRandomApi()
  await res.json(response)
});

module.exports = router;
