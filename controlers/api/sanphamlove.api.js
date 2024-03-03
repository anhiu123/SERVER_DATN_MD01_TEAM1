var md = require('../../modal/sanphamlove');
var md1 = require('../../modal/sanpham.modal');
const { param } = require('../../routes');

exports.getSPL = async (req,res,next)=>{

    let objRes = {
        msg: '',
        status: 0,
        data: []
        };  
        try{
        let id_u = req.params.id;
        let listIdSP = null;
        listIdSP = await md.SploveModal.find({UserId : id_u});

        for (let i = 0; i < listIdSP.length; i++) {
            let productId1 = listIdSP[i].ProductId;
            let listPR = await md1.spModal.findOne({ _id: productId1 });
            if (listPR) {
                objRes.data.push(listPR);
            }
        }    
        objRes.msg = "Lấy dữ liệu thành công";
        }catch(err){
        console.log(err);
        objRes.msg = err.message;
        }
        res.json(objRes.data);
        
}

exports.addSPL = async (req,res,next)=>{

    let objRes = {
        msg: '',
        status: 0,
        data: {}
        };
      
        try {
            
            let objDH = new  md.SploveModal();
            objDH.UserId = req.body.UserId;
            objDH.ProductId = req.body.ProductId;

            objRes.data = await objDH.save();
            objRes.msg = "Thêm thành công";
            objRes.status = 1;
        } catch (error) {
            objRes.msg = error.message;
        }
        return res.json(objRes);
}