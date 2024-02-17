var express = require('express');
var router = express.Router();

var apiDG = require('../../controlers/api/thongbao.api');

router.get('/', apiDG.getTB);

router.post('/', apiDG.addTB);

module.exports = router;