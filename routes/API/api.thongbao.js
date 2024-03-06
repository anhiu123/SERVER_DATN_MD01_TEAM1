var express = require('express');
var router = express.Router();

var apiDG = require('../../controlers/api/thongbao.api');

router.get('/:id', apiDG.getTB);

router.post('/', apiDG.addTB);

module.exports = router;