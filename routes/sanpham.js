var express = require('express');
var router = express.Router();

/* GET home page. */
//nhúng controler 
var sp = require('../controlers/sanpham.controler')
var checkLG = require('../middleware/check-Login');
var checkSP = require('../middleware/check-AddSP');

var multer = require('multer');
var objUpload = multer({dest:'./tmp'})

//http://localhost:3000/ trang chủ 
router.get('/',checkLG.yeu_cau_login, sp.spList);

router.get('/home',checkLG.yeu_cau_login, sp.Home);
// router.post('/', sp.spList);

router.get('/add',checkLG.yeu_cau_login, sp.spAdd);
router.post('/add', objUpload.single('anh') , checkSP.addSP,checkLG.yeu_cau_login, sp.spAdd)

router.get('/search',checkLG.yeu_cau_login, sp.spSearch);

router.get('/delete/:id_sp',checkLG.yeu_cau_login, sp.spDel);
router.post('/delete/:id_sp',checkLG.yeu_cau_login, sp.spDel);

router.get('/update/:id_sp',checkLG.yeu_cau_login, sp.spUpdate);
router.post('/update/:id_sp',checkLG.yeu_cau_login,objUpload.single('anh'), sp.spUpdate);

module.exports = router;