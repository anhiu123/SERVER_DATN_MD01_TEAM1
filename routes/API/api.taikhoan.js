var express = require('express');
var router = express.Router();


var apiTK = require('../../controlers/api/taikhoan.api');

router.get('/', apiTK.getUsers);

router.post('/', apiTK.addUs);

// router.delete('/:id', apiTK.dltUS);

router.put('/:id', apiTK.putUS);


router.put('/mk/:id', apiTK.putMK);

module.exports = router;
