var express = require('express');
var router = express.Router();

var apiDG = require('../../controlers/api/voucher.api');

router.get('/', apiDG.getVC);

router.get('/:id', apiDG.getCTVC);

module.exports = router;