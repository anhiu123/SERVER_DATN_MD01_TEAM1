var md = require('../../modal/voucher.modal');
const { param } = require('../../routes');

exports.getVC = async (req,res,next)=>{

    let objRes = {
        msg: '',
        status: 0,
        data: []
        };  
        try{
        objRes.data = await md.VoucherModal.find();
        objRes.msg = "Lấy dữ liệu thành công";
        }catch(err){
        console.log(err);
        objRes.msg = err.message;
        }
        res.json(objRes.data);
        
}
exports.getCTVC = async (req,res,next)=>{

    let objRes = {
        msg: '',
        status: 0,
        data: []
        };  
        let id = req.params.id;
        try{
        objRes.data = await md.VoucherModal.findById(id);
        objRes.msg = "Lấy dữ liệu thành công";
        }catch(err){
        console.log(err);
        objRes.msg = err.message;
        }
        res.json(objRes.data);
        
}