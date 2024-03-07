var express = require('express');
var router = express.Router();

var apiTN = require('../../controlers/api/tinnhan.api');

router.get('/:id', apiTN.getTN);

router.post('/', apiTN.addTN);

module.exports = router;