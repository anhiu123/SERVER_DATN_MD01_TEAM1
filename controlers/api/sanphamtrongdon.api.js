var md = require('../../modal/sanphamindon.modal');
const { param } = require('../../routes');

exports.getSPH = async (req,res,next)=>{

    let objRes = {
        msg: '',
        status: 0,
        data: []
        };  
        try{
        objRes.data = await md.SPHModal.find();
        objRes.msg = "Lấy dữ liệu thành công";
        }catch(err){
        console.log(err);
        objRes.msg = err.message;
        }
        res.json(objRes.data);
        
}

exports.getDHORDER = async (req,res,next)=>{

    let objRes = {
        msg: '',
        status: 0,
        data: []
        };  
        try{
            let id_dh = req.params.id;
        objRes.data = await md.SPHModal.find({OrderId:id_dh});
        objRes.msg = "Lấy dữ liệu thành công";
        }catch(err){
        console.log(err);
        objRes.msg = err.message;
        }
        res.json(objRes.data);
        
}

exports.addSPH = async (req, res, next) => {
    let objRes = {
        msg: '',
        status: 0,
        data: {}
    };

    try {
        let danhSachSanPham = req.body.danhSachSanPham; // Nhận mảng dữ liệu sản phẩm từ request

        if (danhSachSanPham && danhSachSanPham.length > 0) {
            // Lặp qua từng sản phẩm trong mảng và thêm vào bảng sản phẩm
            for (let i = 0; i < danhSachSanPham.length; i++) {
                let sanPham = danhSachSanPham[i];
                
                let objDH = new md.SPHModal();
                objDH.OrderId = sanPham.OrderId;
                objDH.ProductId = sanPham.ProductId;
                objDH.ColorCode = sanPham.ColorCode;
                objDH.Size = sanPham.Size;
                objDH.Quantity = sanPham.Quantity;
                objDH.PropertiesId = sanPham.PropertiesId;
                objDH.Image = sanPham.Image;

                await objDH.save();
            }

            objRes.msg = "Thêm thành công";
            objRes.status = 1;
        } else {
            objRes.msg = "Danh sách sản phẩm trống";
        }
    } catch (error) {
        objRes.msg = error.message;
    }

    return res.json(objRes);
}
