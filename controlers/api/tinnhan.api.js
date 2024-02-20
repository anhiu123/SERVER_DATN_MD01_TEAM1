var md = require('../../modal/tinnhan.modal');
const { param } = require('../../routes');

exports.getTN = async (req,res,next)=>{

    let objRes = {
        msg: '',
        status: 0,
        data: []
        };  
        try{
        objRes.data = await md.TinNhanModal.find();
        objRes.msg = "Lấy dữ liệu thành công";
        }catch(err){
        console.log(err);
        objRes.msg = err.message;
        }
        res.json(objRes.data);
        
}

exports.addTN = async (req,res,next)=>{

    let objRes = {
        msg: '',
        status: 0,
        data: {}
        };
      
        try {
            
            let objTN = new  md.TinNhanModal();
            objTN.UserId = req.body.UserId;
            objTN.content = req.body.content;
            objTN.date = req.body.date;
            objTN.sender = req.body.sender;
            objTN.AdminId = req.body.AdminId;
          
    
            objRes.data = await objTN.save();
            objRes.msg = "Thêm thành công";
            objRes.status = 1;
        } catch (error) {
            objRes.msg = error.message;
        }
        return res.json(objRes);
        
}