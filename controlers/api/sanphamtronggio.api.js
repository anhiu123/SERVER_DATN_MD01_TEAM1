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

exports.addSPG = async (req,res,next)=>{

    let objRes = {
        msg: '',
        status: 0,
        data: {}
        };
      
        try {
            
            let objDH = new  md.SPGModal();
            objDH.CartId = req.body.CartId;
            objDH.ProductId = req.body.ProductId;
            objDH.ColorCode = req.body.ColorCode;
            objDH.Size = req.body.Size;
            objDH.Quantity = req.body.Quantity;
            objDH.PropertiesId =req.body.PropertiesId;
            objDH.Image =req.body.Image;
    
            objRes.data = await objDH.save();
            objRes.msg = "Thêm thành công";
            objRes.status = 1;
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
        
    let id_sp = req.params.id;

    try {
     await md.SPGModal.findByIdAndDelete(id_sp);
     objRes.msg = "Đã xóa thành công";
        objRes.status = 1;    
    } catch (error) {
        objRes.msg = error.message;
    }

    res.json (objRes);
}