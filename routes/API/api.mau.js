var express = require('express');
var router = express.Router();

var apiSP = require('../../controlers/api/mau.api');
var checkLG = require('../../middleware/check-Login');


router.get('/', apiSP.getMau);

module.exports = router;