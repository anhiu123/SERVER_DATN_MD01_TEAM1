var express = require('express');
var router = express.Router();

var sz = require('../controlers/size.controler')
var checkLG = require('../middleware/check-Login');


router.get('/',checkLG.yeu_cau_login, sz.szList);

router.get('/addsize',checkLG.yeu_cau_login, sz.szAdd);
router.post('/addsize',checkLG.yeu_cau_login, sz.szAdd);

module.exports = router;