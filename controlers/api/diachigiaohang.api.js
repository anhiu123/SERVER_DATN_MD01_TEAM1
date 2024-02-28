var md = require('../../modal/diachigiaohang.modal');
const { param } = require('../../routes');

exports.getDCGH = async (req,res,next)=>{

    let objRes = {
        msg: '',
        status: 0,
        data: []
        };  
        try{
        objRes.data = await md.DCGHModal.find();
        objRes.msg = "Lấy dữ liệu thành công";
        }catch(err){
        console.log(err);
        objRes.msg = err.message;
        }
        res.json(objRes.data);
        
}

exports.addDCGH = async (req,res,next)=>{

    let objRes = {
                msg: '',
                status: 0,
                data: {}
                };
              
                try {
                    
                    let objDH = new  md.DCGHModal();
                    objDH.UserId = req.body.UserId;
                    objDH.name = req.body.name;
                    objDH.city = req.body.city;
                    objDH.street = req.body.street;
                    objDH.phone = req.body.phone;

                    objRes.data = await objDH.save();
                    objRes.msg = "Thêm thành công";
                    objRes.status = 1;
                } catch (error) {
                    objRes.msg = error.message;
                }
                return res.json(objRes);
}

exports.dlDCGH = async (req,res,next)=>{

    let objRes = {
        msg: '',
        status: 0,
        data: {}
        };
        
    let id = req.params.id;

    try {
     await md.DCGHModal.findByIdAndDelete(id);
     objRes.msg = "Đã xóa thành công";
        objRes.status = 1;    
    } catch (error) {
        objRes.msg = error.message;
    }

    res.json (objRes);
}

exports.getCTDCGH = async (req,res,next)=>{

    let objRes = {
        msg: '',
        status: 0,
        data: []
        };  
        let id_u = req.params.id;
        try{
        objRes.data = await md.DCGHModal.findOne({UserId:id_u});
        objRes.msg = "Lấy dữ liệu thành công";
        }catch(err){
        console.log(err);
        objRes.msg = err.message;
        }
        res.json(objRes.data);
        
}