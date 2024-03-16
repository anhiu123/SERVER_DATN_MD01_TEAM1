var express = require('express');
var router = express.Router();

var m = require('../controlers/mau.controler')
var checkLG = require('../middleware/check-Login');


router.get('/',checkLG.yeu_cau_login, m.mList);

router.get('/addmau',checkLG.yeu_cau_login, m.mAdd);
router.post('/addmau',checkLG.yeu_cau_login, m.mAdd);

router.get('/delete/:id_m',checkLG.yeu_cau_login, m.mDel);
router.post('/delete/:id_m',checkLG.yeu_cau_login, m.mDel);

router.get('/update/:id_m',checkLG.yeu_cau_login, m.mUp);
router.post('/update/:id_m',checkLG.yeu_cau_login, m.mUp);

module.exports = router;