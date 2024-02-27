var express = require('express');
var router = express.Router();

var apiSP = require('../../controlers/api/mausanpham.api');


router.get('/', apiSP.getMau);

router.get('/:id', apiSP.getCTMau);

module.exports = router;