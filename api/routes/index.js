var express = require('express');
var router = express.Router();


router.get('/carrots', function(req, res, next) {
  res.json({
    color:'orange'
  })
});
router.get('/apples', function(req, res, next) {
  res.json({
    color:'green'
  })
});

module.exports = router;
