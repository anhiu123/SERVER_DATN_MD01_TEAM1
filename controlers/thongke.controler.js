
var md = require('../modal/sanpham.modal');
var md1 = require('../modal/donhang.modal');
var mdTK = require('../modal/taikhoan.modal');
var mdSPD = require('../modal/sanphamindon.modal');


var md = require('../modal/sanpham.modal');
var mdTL = require('../modal/theloai.modal');
const mdMauSanPham = require('../modal/mausanpham.modal'); 
const Mau = require('../modal/mau.model');
var mdDH = require('../modal/donhang.modal');     // md1
var mdTB = require('../modal/thongbao.modal');

exports.tkDoanhThu = async(req, res, next) => {
    // render ra view 
    let objU = req.session.userLogin;
    let listSPD = null;
    let listSP = null;
    let listdh = null;
    let listTK = null;
    listTK = await mdTK.tkModal.find();
    listdh  =  await md1.DonHangModal.find({ status:  "Đã giao"  });
   
    if (req.method === "POST") {
        try {
            // Lấy ngày bắt đầu và kết thúc từ form
            const startDate = req.body.start_date;
            const endDate = req.body.end_date;

            listSPD = await mdSPD.SPHModal.find();
          //  listSP = await md.spModal.find();
            // Thực hiện truy vấn vào cơ sở dữ liệu để lấy các hóa đơn trong khoảng thời gian và có trạng thái "Đã giao"
            const donHangDaGiao = await md1.DonHangModal.find({
               date: { $gte: startDate, $lte: endDate },
                status: "Đã giao"
            });

            console.log("Đơn Hàng  :"  + donHangDaGiao);

            // Tính tổng tiền từ các hóa đơn đã lấy được
            let tongTien = 0;
            for (const donHang of donHangDaGiao) {
                try {
                    const listSPD = await mdSPD.SPHModal.find({ DonHangId: donHang._id });
                    for (const spd of listSPD) {
                       
                        const sanPham = await md.spModal.findById(spd.SanPhamId);
                        console.log(sanPham); // Kiểm tra sản phẩm đã lấy được
                        tongTien += sanPham.price * spd.SoLuong || 0; // Giả sử có trường tổng tiền trong hóa đơn
                    }
                } catch (error) {
                    console.error('Lỗi khi truy vấn sản phẩm trong đơn hàng:', error);
                }
            }
            
        
           //     console.log(listSPD);
           //     console.log(listSP);
            // Render view với dữ liệu tổng tiền
            res.render('thongke/doanhthu', { objU: objU, tongTien: tongTien , listDH : donHangDaGiao ,listTK :listTK });
        } catch (error) {
            console.error('Lỗi khi truy vấn và tính toán tổng tiền:', error);
            // Xử lý lỗi và render trang lỗi hoặc thông báo lỗi ra cho người dùng
            res.render('thongke/doanhthu', { objU: objU, error: error });
        }
    } else {
        // Trường hợp không phải từ phương thức POST, render trang mặc định
     
    }
    res.render('thongke/doanhthu', { objU: objU , listDH : listdh , listTK:listTK });
}

exports.tktk = async(req, res, next) => {

    let listTK = null;
    listTK = await mdTK.tkModal.find();
    let objU = req.session.userLogin;
    const donHangDaGiao = await md1.DonHangModal.find({
         status: "Đã giao"
     });

    res.render('thongke/DH', { objU: objU , listDH : donHangDaGiao , listTK:listTK });

}


exports.dhdone = async (req, res, next) => {

    let objU = req.session.userLogin;
    let id_dh = req.params.id_dh;
    let listsp = null;
    let listspd = null;
    let listmauSP = null;
    let mauList = null;
    let listDH = null;
    let listTK = null;
    let objDH_2  = null;
    let listDH1= null;

    try {
        listspd = await mdSPD.SPHModal.find({DonHangId : id_dh});
        listmauSP = await mdMauSanPham.mauSPModal.find();
        listDH = await md1.DonHangModal.find({_id  : id_dh });
        listsp = await md.spModal.find();
        listDH1 = await md1.DonHangModal.find({ status: { $ne: "Đã giao" } });
        listTK = await mdTK.tkModal.find();
        mauList = await Mau.mauModal.find();
    
} catch (error) {
    console.log(error);
    msg = error.message;
}

    
res.render('thongke/DHdone',{objU:objU ,listspd:listspd,listsp:listsp,listmauSP:listmauSP ,mauList:mauList,listDH:listDH , objDH_2:objDH_2});

}

exports.tkTop = async (req, res, next) => {
    try {
        // Lấy thông tin người dùng từ session
        let objU = req.session.userLogin;

        // Sử dụng await để đợi kết quả truy vấn
        let list = await md.spModal.find().sort({quantitySold: -1}).limit(5);

        // Truyền dữ liệu sang view và render
        res.render('thongke/top', { objU: objU, listsp: list });
    } catch (error) {
        console.log(error);
        res.status(500).send("Có lỗi xảy ra khi thực hiện thống kê.");
    }
}
