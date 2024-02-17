var md = require('../../modal/donhang.modal');
const { param } = require('../../routes');

var md1 = require('../../modal/sanphamindon.modal');

exports.getDH = async (req,res,next)=>{

    let objRes = {
        msg: '',
        status: 0,
        data: []
        };  
        try{
        objRes.data = await md.DonHangModal.find();
        objRes.msg = "Lấy dữ liệu thành công";
        }catch(err){
        console.log(err);
        objRes.msg = err.message;
        }
        res.json(objRes.data);
        
}

exports.addDH = async (req,res,next)=>{

    let objRes = {
                msg: '',
                status: 0,
                data: {}
                };
              
                try {
                    
                    let objDH = new  md.DonHangModal();
                    objDH.UserId = req.body.name;
                    objDH.status = req.body.image;
                    objDH.date = req.body.mota;
            
                    objRes.data = await objDH.save();
                    objRes.msg = "Thêm thành công";
                    objRes.status = 1;
                } catch (error) {
                    objRes.msg = error.message;
                }
                return res.json(objRes);
}

exports.getSPDH = async (req,res,next)=>{

    let objRes = {
        msg: '',
        status: 0,
        data: []
        };  
        try{
        objRes.data = await md1.SPHModal.find();
        objRes.msg = "Lấy dữ liệu thành công";
        }catch(err){
        console.log(err);
        objRes.msg = err.message;
        }
        res.json(objRes.data);
        
}