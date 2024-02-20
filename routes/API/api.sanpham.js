var express = require('express');
var router = express.Router();

var apiSP = require('../../controlers/api/sanpham.api');

var apiSPG = require('../../controlers/api/sanphamtronggio.api');

var apiSPL = require('../../controlers/api/sanphamlove.api');


router.get('/', apiSP.getSP);

router.get('/SPG', apiSPG.getSPG);

router.post('/SPG', apiSPG.addSPG);


router.delete('/:id', apiSPG.dltSPG);


router.get('/SPL', apiSPL.getSPL);

router.post('/SPL', apiSPL.addSPL);
// router.post('/', apiSP.addSP);

// router.delete('/:id', apiSP.dltSP);

// router.put('/:id', apiSP.putSP);

router.get('/:id', apiSP.xemct1SP);



module.exports = router;
