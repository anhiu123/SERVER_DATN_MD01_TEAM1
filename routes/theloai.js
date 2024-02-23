var express = require('express');
var router = express.Router();

var tl = require('../controlers/theloai.controler')
var checkLG = require('../middleware/check-Login');

var multer = require('multer');
var objUpload = multer({dest:'./tmp'})

router.get('/',checkLG.yeu_cau_login, tl.tlList);

router.get('/addloai',checkLG.yeu_cau_login, tl.tlAdd);
router.post('/addloai', objUpload.single('anh'),checkLG.yeu_cau_login, tl.tlAdd);

router.get('/deletel/:id_tl',checkLG.yeu_cau_login, tl.tlDel);
router.post('/deletel/:id_tl',checkLG.yeu_cau_login, tl.tlDel);

router.get('/updatel/:id_tl',checkLG.yeu_cau_login, tl.tlUp);
router.post('/updatel/:id_tl', objUpload.single('anh'),checkLG.yeu_cau_login, tl.tlUp);

module.exports = router;
