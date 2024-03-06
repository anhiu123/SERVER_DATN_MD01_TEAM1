var express = require('express');
var router = express.Router();

var apiDH = require('../../controlers/api/donhang.api');

router.get('/:id', apiDH.getDH);

router.get('/:id', apiDH.getDHDG);

router.get('/SPD/:id', apiDH.getSPDH);

router.post('/', apiDH.addDH);

module.exports = router;