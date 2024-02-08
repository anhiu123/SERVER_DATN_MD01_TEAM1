var md = require('../modal/sanpham.modal');

var md1 = require('../modal/taikhoan.modal');
exports.chat = async (req,res,next) =>{
    // render ra view 
    let listSP = null;
    let objU = req.session.userLogin;
    try {
        listSP = await md1.tkModal.find();

    } catch (error) {
        console.log(error);
    }
  

    res.render('chat/chat',{objU:objU,listSP:listSP});

}

exports.chatdetail = async (req,res,next) =>{
    // render ra view 
    let us = null;
    let objU = req.session.userLogin;
    let id_us = req.params.id_u;
   
    try {
        us = await md1.tkModal.find({ _id: id_us });
        console.log(us);

    } catch (error) {
        console.log(error);
    }
  

    res.render('chat/detailchat',{objU:objU,us:us});

}