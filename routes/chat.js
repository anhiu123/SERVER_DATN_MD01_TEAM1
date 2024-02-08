var express = require('express');
var router = express.Router();

var c = require('../controlers/chat.controler')
var checkLG = require('../middleware/check-Login');


router.get('/',checkLG.yeu_cau_login, c.chat);

router.get('/detail/:id_u',checkLG.yeu_cau_login, c.chatdetail);
router.post('/detail/:id_u',checkLG.yeu_cau_login, c.chatdetail);



module.exports = router;