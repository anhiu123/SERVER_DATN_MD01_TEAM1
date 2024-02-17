var express = require('express');
var router = express.Router();

var tke = require('../controlers/thongke.controler')
var checkLG = require('../middleware/check-Login');

router.get('/',checkLG.yeu_cau_login, tke.tkDoanhThu);
router.get('/top',checkLG.yeu_cau_login, tke.tkTop);

router.get('/DH',checkLG.yeu_cau_login, tke.tktk);

router.get('/dhdone/:id_dh',checkLG.yeu_cau_login, tke.dhdone);

router.post('/', checkLG.yeu_cau_login, tke.tkDoanhThu);
module.exports = router;