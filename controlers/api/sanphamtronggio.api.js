var md = require('../../modal/sanphamingio.modal');

const { param } = require('../../routes');

exports.getSPG = async (req,res,next)=>{

    let objRes = {
        msg: '',
        status: 0,
        data: []
        };  
        try{
        objRes.data = await md.SPGModal.find();
        objRes.msg = "Lấy dữ liệu thành công";
        }catch(err){
        console.log(err);
        objRes.msg = err.message;
        }
        res.json(objRes.data);
        
}

exports.getSPGSS = async (req,res,next)=>{

    let objRes = {
        msg: '',
        status: 0,
        data: []
        };  
        let id_sp = req.params.id;
        let clcode = req.params.id_cl;
        let size = req.params.id_s;
        try{
        objRes.data = await md.SPGModal.findOne({ProductId:id_sp , ColorCode:clcode,Size:size});
        objRes.msg = "Lấy dữ liệu thành công";
        }catch(err){
        console.log(err);
        objRes.msg = err.message;
        }
        res.json(objRes.data);
        
}

exports.getSPGID = async (req,res,next)=>{

    let objRes = {
        msg: '',
        status: 0,
        data: []
        };  
        try{
            let id_u = req.params.id;
        objRes.data = await md.SPGModal.find({CartId:id_u});
        objRes.msg = "Lấy dữ liệu thành công";
        }catch(err){
        console.log(err);
        objRes.msg = err.message;
        }
        res.json(objRes.data);
        
}

exports.addSPG = async (req,res,next)=>{

    let objRes = {
        msg: '',
        status: 0,
        data: {}
        };
      
        let id_sp = req.params.id;
        let clcode = req.params.id_cl;
        let size = req.params.id_s;
        try {
            let sanphamCart = await md.SPGModal.findOne({ProductId:id_sp , ColorCode:clcode,Size:size});

            if (sanphamCart != null) {
                objRes.msg = "Thêm Thất Bại";
                objRes.status = 0;
            } else {
                let objDH = new  md.SPGModal();
                objDH.CartId = req.body.CartId;
                objDH.ProductId = req.body.ProductId;
                objDH.ColorCode = req.body.ColorCode;
                objDH.Name = req.body.Name;
                objDH.Price = req.body.Price;
                objDH.Size = req.body.Size;
                objDH.Quantity = req.body.Quantity;
                objDH.PropertiesId =req.body.PropertiesId;
                objDH.Image =req.body.Image;
        
                objRes.data = await objDH.save();
                objRes.msg = "Thêm thành công";
                objRes.status = 1;
            }
            
           
        } catch (error) {
            objRes.msg = error.message;
        }
        return res.json(objRes);
        
}

exports.dltSPG = async (req,res,next)=>{

    let objRes = {
        msg: '',
        status: 0,
        data: {}
        };
        
    let cartId = req.params.id;

    try {
     await md.SPGModal.findByIdAndDelete(id_sp);
     objRes.msg = "Đã xóa thành công";
        objRes.status = 1;    
    } catch (error) {
        objRes.msg = error.message;
    }

    try {
        // Xóa tất cả các sản phẩm có CartId tương ứng
        const result = await md.SPGModal.deleteMany({ CartId: cartId });

        if (result.deletedCount > 0) {
            objRes.msg = "Đã xóa thành công " + result.deletedCount + " sản phẩm";
            objRes.status = 1;
        } else {
            objRes.msg = "Không tìm thấy sản phẩm nào để xóa";
        }
    } catch (error) {
        objRes.msg = error.message;
    }


    res.json (objRes);
}