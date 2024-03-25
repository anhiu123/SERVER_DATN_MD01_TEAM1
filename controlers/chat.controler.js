var md = require('../modal/sanpham.modal');
var mdTN = require('../modal/tinnhan.modal');
var md1 = require('../modal/taikhoan.modal');
var mdTB = require('../modal/thongbao.modal');
const moment = require('moment');
const { db } = require("./firebase.config");
const { set, ref } = require("firebase/database");

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


// Route handler
exports.chatdetail = async (req, res, next) => {
  let us = null;
  let objU = req.session.userLogin;
  let id_us = req.params.id_u;
  let msg = "";
  let listTN = [];

  const fullDateTimeString = moment().format('YYYY-MM-DD HH:mm:ss');

  try {
    us = await md1.tkModal.find({ _id: id_us });



    async function renderPage(req, res) {
      try {
          msg = "";
          us = await md1.tkModal.find({ _id: id_us });
          let objU = req.session.userLogin;
          res.render('chat/detailchat', { objU: objU, us: us, msg: msg, listTN: listTN , id_us : id_us });
      } catch (error) {
          console.log(error);
          // Xử lý lỗi tại đây nếu cần
      }
  }
  
    db.ref('tinnhan').on('child_added', snapshot => {
      const data = snapshot.val();
    
      // Kiểm tra xem tin nhắn có thuộc về người dùng hiện tại không
      if (data.UserId === id_us) {
          // Nếu có, thêm tin nhắn vào danh sách listTN
          listTN.push(data);
          // console.log(listTN);
      }
      renderPage(req, res);
 
  });

  } catch (error) {
    console.log(error);
  }

  async function renderPage(req, res) {
    try {
        msg = "";
        us = await md1.tkModal.find({ _id: id_us });
        let objU = req.session.userLogin;
        res.render('chat/detailchat', { objU: objU, us: us, msg: msg, listTN: listTN });
    } catch (error) {
        console.log(error);
        // Xử lý lỗi tại đây nếu cần
    }
}
  async function addToFirebaseAndRenderPage(data) {
    try {
        db.ref("tinnhan").push(data, (error) => {
            if (error) {
                console.error("Lỗi khi đặt dữ liệu:", error);
            } else {
                console.log("Dữ liệu đã được đặt thành công!");
                renderPage(req, res);

            }
        });
    } catch (error) {
        console.error(error);
       

    }
}

  if (req.method == "POST") {
    if (req.body.noidung.length == 0) {
        msg = "Không Được Để Trống";
        renderPage(req, res);

        return; // Thoát khỏi hàm
    }

    const data = {
  
        content: req.body.noidung,
        date: fullDateTimeString,
        sender: "admin",
        UserId: id_us,
    };

    addToFirebaseAndRenderPage(data);
} else {
    // Xử lý các trường hợp khác nếu cần
}
};








 // try {
        //     let objtn = new mdTN.TinNhanModal();
        //     objtn.content = req.body.noidung;
        //     objtn.date  = fullDateTimeString;
        //     objtn.sender = "admin";
        //     objtn.UserId = id_us;
        //     // objtn.AdminId = objU._id;
        //     await objtn.save();

        //     res.redirect(req.originalUrl);
        // } catch (error) {
        //     console.log(" Lõi  : " + error);
        // }

         // res.render('chat/detailchat',{objU:objU,us:us,msg:msg,listTN:listTN});