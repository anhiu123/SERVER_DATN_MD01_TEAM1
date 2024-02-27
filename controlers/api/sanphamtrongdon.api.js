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

exports.addSPH = async (req,res,next)=>{

    let objRes = {
        msg: '',
        status: 0,
        data: {}
        };
      
        try {
            
            let objDH = new  md.SPHModal();
            objDH.OrderId = req.body.OrderId;
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