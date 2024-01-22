var express = require('express');
var router = express.Router();

var tke = require('../controlers/thongke.controler')
var checkLG = require('../middleware/check-Login');

router.get('/',checkLG.yeu_cau_login, tke.tkDoanhThu);
router.get('/top',checkLG.yeu_cau_login, tke.tkTop);

module.exports = router;