var express = require('express');
var router = express.Router();

var apiDH = require('../../controlers/api/donhang.api');

router.get('/', apiDH.getDH);

router.get('/SPD', apiDH.getSPDH);

router.get('/add', apiDH.addDH);

module.exports = router;