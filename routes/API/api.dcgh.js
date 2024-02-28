var express = require('express');
var router = express.Router();

var apiDG = require('../../controlers/api/diachigiaohang.api');

router.get('/', apiDG.getDCGH);

router.post('/', apiDG.addDCGH);

router.delete('/:id', apiDG.dlDCGH);
router.get('/:id', apiDG.getCTDCGH);

module.exports = router;