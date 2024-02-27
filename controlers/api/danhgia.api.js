var md = require('../../modal/danhgia.modal');
const { param } = require('../../routes');

exports.getDG = async (req,res,next)=>{

    let objRes = {
        msg: '',
        status: 0,
        data: []
        };  
        try{
        objRes.data = await md.DGModal.find();
        objRes.msg = "Lấy dữ liệu thành công";
        }catch(err){
        console.log(err);
        objRes.msg = err.message;
        }
        res.json(objRes.data);
        
}

exports.addDG = async (req,res,next)=>{

    let objRes = {
        msg: '',
        status: 0,
        data: {}
        };
      
        try {
            
            let objDH = new  md.DGModal();
            objDH.UserId = req.body.UserId;
            objDH.SanPhamId = req.body.SanPhamId;
            objDH.date = req.body.date;
            objDH.noidung = req.body.noidung;
            objDH.sao = req.body.sao;
    
            objRes.data = await objDH.save();
            objRes.msg = "Thêm thành công";
            objRes.status = 1;
        } catch (error) {
            objRes.msg = error.message;
        }
        return res.json(objRes);
        
}

exports.getCTDG = async (req,res,next)=>{

    let objRes = {
        msg: '',
        status: 0,
        data: []
        };  
        try{
            let id_sp = req.params.id;
        objRes.data = await md.DGModal.findOne({SanPhamId : id_sp});
        objRes.msg = "Lấy dữ liệu thành công";
        }catch(err){
        console.log(err);
        objRes.msg = err.message;
        }
        res.json(objRes.data);
        
}