
var md = require('../modal/sanpham.modal');
exports.tkDoanhThu = async(req,res,next) =>{
    // render ra view 

    let objU = req.session.userLogin;

    res.render('thongke/doanhthu',{objU:objU});

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
