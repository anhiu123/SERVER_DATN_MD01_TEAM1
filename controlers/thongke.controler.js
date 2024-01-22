
var md = require('../modal/sanpham.modal');
exports.tkDoanhThu = async(req,res,next) =>{
    // render ra view 

    let objU = req.session.userLogin;

    res.render('thongke/doanhthu',{objU:objU});

}

exports.tkTop = async(req,res,next) =>{
    // render ra view 
    let list =null;
    let objU = req.session.userLogin;
    list = await md.spModal.find();

    res.render('thongke/top',{objU:objU,listsp : list});

}