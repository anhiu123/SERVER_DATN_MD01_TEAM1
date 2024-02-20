var md = require('../modal/sanpham.modal');
var mdTN = require('../modal/tinnhan.modal');
var md1 = require('../modal/taikhoan.modal');
const moment = require('moment');
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
    let msg = "";
    let listTN = null;
    const fullDateTimeString = moment().format('YYYY-MM-DD HH:mm:ss');
    try {
        us = await md1.tkModal.find({ _id: id_us });
       listTN = await mdTN.TinNhanModal.find({ UserId: id_us });

    } catch (error) {
        console.log(error);
    }

    if (req.method == "POST") {
        if(req.body.noidung.length ==0){
            msg = "Không ĐƯợc Để Trống";
            return res.render('chat/detailchat',{objU:objU,us:us,msg:msg,lisTN:listTN});
        }
        try {
            let objtn = new mdTN.TinNhanModal();
            objtn.content = req.body.noidung;
            objtn.date  = fullDateTimeString;
            objtn.sender = "admin";
            objtn.UserId = id_us;
            objtn.AdminId = objU._id;
            await objtn.save();
            res.redirect(req.originalUrl);
        } catch (error) {
            console.log(" Lõi  : " + error);
        }
      
    }
  

    res.render('chat/detailchat',{objU:objU,us:us,msg:msg,listTN:listTN});

}