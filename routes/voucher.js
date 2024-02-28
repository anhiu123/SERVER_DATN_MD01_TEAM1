var express = require('express');
var router = express.Router();

var vc = require('../controlers/voucher.controler')
var checkLG = require('../middleware/check-Login');

var multer = require('multer');
var objUpload = multer({dest:'./tmp'})

router.get('/',checkLG.yeu_cau_login, vc.vcList);

router.get('/addvc',checkLG.yeu_cau_login, vc.vcAdd);
router.post('/addvc', objUpload.single('anh'),checkLG.yeu_cau_login, vc.vcAdd);

router.get('/delete/:id_tl',checkLG.yeu_cau_login, vc.vcDel);
router.post('/delete/:id_tl',checkLG.yeu_cau_login, vc.vcDel);

router.get('/update/:id_tl',checkLG.yeu_cau_login, vc.vcUp);
router.post('/update/:id_tl', objUpload.single('anh'),checkLG.yeu_cau_login, vc.vcUp);

module.exports = router;
