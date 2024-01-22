var express = require('express');
var router = express.Router();

/* GET home page. */
//nhúng controler 
var tk = require('../controlers/taikhoan.controler');
var checkLG = require('../middleware/check-Login');
//http://localhost:3000/ trang chủ 
router.get('/',checkLG.yeu_cau_login, tk.tkList);
router.post('/',checkLG.yeu_cau_login, tk.tkList);

router.get('/add',checkLG.yeu_cau_login, tk.tkAdd);
router.post('/add',checkLG.yeu_cau_login, tk.tkAdd);

router.get('/delete/:id_u',checkLG.yeu_cau_login, tk.tkDel);
router.post('/delete/:id_u',checkLG.yeu_cau_login, tk.tkDel);

router.get('/update/:id_u',checkLG.yeu_cau_login, tk.tkUp);
router.post('/update/:id_u',checkLG.yeu_cau_login, tk.tkUp);

module.exports = router;