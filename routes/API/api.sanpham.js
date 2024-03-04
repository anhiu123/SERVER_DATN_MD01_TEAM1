var express = require('express');
var router = express.Router();

var apiSP = require('../../controlers/api/sanpham.api');

var apiSPG = require('../../controlers/api/sanphamtronggio.api');

var apiSPL = require('../../controlers/api/sanphamlove.api');

var apiSPD = require('../../controlers/api/sanphamtrongdon.api');


router.get('/', apiSP.getSP);

router.get('/top8', apiSP.getSPTop);

router.get('/SPG', apiSPG.getSPG);

router.get('/SPG/:id', apiSPG.getSPGID);

router.get('/SPG/:id/:id_cl/:id_s', apiSPG.getSPGSS);

router.post('/SPG/:id/:id_cl/:id_s', apiSPG.addSPG);

router.get('/SPD', apiSPD.getSPH);

router.post('/SPD', apiSPD.addSPH);


router.delete('/:id', apiSPG.dltSPG);


router.get('/SPL/:id', apiSPL.getSPL);

router.post('/SPL', apiSPL.addSPL);
// router.post('/', apiSP.addSP);

// router.delete('/:id', apiSP.dltSP);

// router.put('/:id', apiSP.putSP);

router.get('/:id', apiSP.xemct1SP);



module.exports = router;
