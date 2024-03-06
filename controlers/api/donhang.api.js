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
            let id_u = req.params.id;
        objRes.data = await md.DonHangModal.find({UserId:id_u});
        objRes.msg = "Lấy dữ liệu thành công";
        }catch(err){
        console.log(err);
        objRes.msg = err.message;
        }
        res.json(objRes.data);
        
}

exports.getDHDG = async (req,res,next)=>{

    let objRes = {
        msg: '',
        status: 0,
        data: []
        };  
        try{
            let id_u = req.params.id;
        objRes.data = await md.DonHangModal.find({UserId:id_u , status : "Đã giao"});
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
                    objDH.UserId = req.body.UserId;
                    objDH.status = req.body.status;
                    objDH.date = req.body.date;
                    objDH.PTTT = req.body.PTTT;
            
                    objRes.data = await objDH.save();
                    objRes.msg = "Thêm thành công";
                    objRes.status = 1;
                } catch (error) {
                    objRes.msg = error.message;
                }
                return res.json(objRes.data);


}

exports.getSPDH = async (req,res,next)=>{

    let objRes = {
        msg: '',
        status: 0,
        data: []
        };  
        let id_dh = req.params.id;
        try{
        objRes.data = await md1.SPHModal.findOne({DonHangId:id_dh});
        objRes.msg = "Lấy dữ liệu thành công";
        }catch(err){
        console.log(err);
        objRes.msg = err.message;
        }
        res.json(objRes.data);
        
}