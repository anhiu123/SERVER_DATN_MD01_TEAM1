var express = require('express');
var router = express.Router();

var apiDG = require('../../controlers/api/danhgia.api');

router.get('/', apiDG.getDG);

router.post('/', apiDG.addDG);

router.get('/:id', apiDG.getCTDG);

module.exports = router;