var md = require('../../modal/thongbao.modal');
const { param } = require('../../routes');

exports.getTB = async (req,res,next)=>{

    let objRes = {
        msg: '',
        status: 0,
        data: []
        };  
        try{
            let id_u = req.params.id;
            let tbSP = null;
        
        objRes.data = await md.ThongBaoModal.find({UserId:id_u});
        tbSP = await md.ThongBaoModal.find({UserId : "1"});
        for (let i = 0; i < tbSP.length; i++) {
                objRes.data.push(tbSP[i]);
        }   
        objRes.msg = "Lấy dữ liệu thành công";
        }catch(err){
        console.log(err);
        objRes.msg = err.message;
        }
        res.json(objRes.data);
        
}

exports.addTB = async (req,res,next)=>{

    let objRes = {
        msg: '',
        status: 0,
        data: {}
        };
      
        try {
            
            let objDH = new  md.ThongBaoModal();
            objDH.UserId = req.body.UserId;
            objDH.status = req.body.status;
            objDH.date = req.body.date;
          
    
            objRes.data = await objDH.save();
            objRes.msg = "Thêm thành công";
            objRes.status = 1;
        } catch (error) {
            objRes.msg = error.message;
        }
        return res.json(objRes);
        
}

exports.getCTTB = async (req,res,next)=>{

    let objRes = {
        msg: '',
        status: 0,
        data: []
        };  
        let id_tb = req.params.id;
        try{
        objRes.data = await md.ThongBaoModal.findById(id_tb);
        objRes.msg = "Lấy dữ liệu thành công";
        }catch(err){
        console.log(err);
        objRes.msg = err.message;
        }
        res.json(objRes.data);
        
}