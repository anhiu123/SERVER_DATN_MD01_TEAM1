var express = require('express');
var router = express.Router();
var md = require('../../modal/sanphamingio.modal');

var apiSP = require('../../controlers/api/sanpham.api');

var apiSPG = require('../../controlers/api/sanphamtronggio.api');

var apiSPL = require('../../controlers/api/sanphamlove.api');

var apiSPD = require('../../controlers/api/sanphamtrongdon.api');


router.get('/', apiSP.getSP);

router.get('/top8', apiSP.getSPTop);

router.get('/SPG', apiSPG.getSPG);

router.get('/SPG/:id', apiSPG.getSPGID);

router.get('/SPG/:id/:id_cl/:id_s', apiSPG.getSPGSS);

router.post('/SPG/:id/:id_cl/:id_s', apiSPG.addSPG);

router.get('/SPD', apiSPD.getSPH);

router.post('/SPD', apiSPD.addSPH);


router.delete('/:id', apiSPG.dltSPG);

router.get('/getOD/:id', apiSPD.getDHORDER);

router.get('/SPL/:id', apiSPL.getSPL);

router.delete('/SPL/:id_u/:id_pr', apiSPL.deleteSPL);

router.post('/SPL/:id_u/:id_pr', apiSPL.addSPL);
// router.post('/', apiSP.addSP);

// router.delete('/:id', apiSP.dltSP);

router.delete('/DLTCART/:id', async (req, res) => {
    const id_sp = req.params.id;
    let objRes = {
        msg: '',
        status: 0,
        data: {}
    };

    try {
        await md.SPGModal.findByIdAndDelete(id_sp);
        objRes.msg = "Đã xóa sản phẩm thành công";
        objRes.status = 1;
    } catch (error) {
        objRes.msg = "Lỗi khi xóa sản phẩm: " + error.message;
    }

    res.status(200).json(objRes);
});

router.delete('/DLTCART', async (req, res) => {
    const productIds = req.body.productIds;
    let objRes = {
        msg: '',
        status: 0,
        data: {}
    };

    try {
        for (const productId of productIds) {
            await md.SPGModal.findByIdAndDelete(productId);
        }
        objRes.msg = "Đã xóa sản phẩm thành công";
        objRes.status = 1;
    } catch (error) {
        objRes.msg = "Lỗi khi xóa sản phẩm: " + error.message;
    }

    res.status(200).json(objRes);
});


// router.put('/:id', apiSP.putSP);

router.get('/:id', apiSP.xemct1SP);

router.get('/name/:id', apiSP.laySPName);



module.exports = router;
