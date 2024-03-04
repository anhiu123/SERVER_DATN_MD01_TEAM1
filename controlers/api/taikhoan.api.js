var md = require('../../modal/taikhoan.modal');
var md1 = require('../../modal/admin.modal');
exports.getUsers = async (req,res,next)=>{

    let objRes = {
        msg: '',
        status: 0,
        data: []
        };
               
        try{
        objRes.data = await md.tkModal.find();
        objRes.msg = "Lấy dữ liệu thành công";
        }catch(err){
        console.log(err);
        objRes.msg = err.message;
        }
        res.json(objRes.data);
}

exports.getADmin = async (req,res,next)=>{

    let objRes = {
        msg: '',
        status: 0,
        data: []
        };
               
        try{
        objRes.data = await md1.adminModal.find();
        objRes.msg = "Lấy dữ liệu thành công";
        }catch(err){
        console.log(err);
        objRes.msg = err.message;
        }
        res.json(objRes.data);
}

exports.addUs = async(req,res,next)=>{

    let objRes = {
        msg: '',
        status: 0,
        data: {}
        };
        let sdt = req.params.sdt;
        let email1 = req.params.email;
        try {
            
            let tkc = await md.tkModal.findOne({email : email1});
            let tkc1 = await md.tkModal.findOne({numberPhone : sdt});

            if (tkc != null || tkc1 != null) {
                objRes.msg = "Thêm Thất Bại , Đã Trùng Email or SDT";
                objRes.status = 0;
                
            } else {
                let objTK = new  md.tkModal();
                objTK.username = req.body.username;
                objTK.passwd = req.body.passwd;
                objTK.email = req.body.email; 
                objTK.address = req.body.address;
                objTK.image = req.body.image;
                objTK.numberPhone = req.body.numberPhone;
               
                objRes.data = await objTK.save();
    
                objRes.msg = "Thêm thành công";
                objRes.status = 1;
            }

           
        } catch (error) {
            objRes.msg = error.message;
        }
        return res.json(objRes);
}
// exports.dltUS = async(req,res,next)=>{

//     let objRes = {
//         msg: '',
//         status: 0,
//         data: {}
//         };  
//     let id_tk = req.params.id;

//     try {

//      await md.tkModal.findByIdAndDelete(id_tk);
//      objRes.msg = "Đã xóa thành công";
//         objRes.status = 1;  
//     } catch (error) {
//         objRes.msg = error.message;
//     }
//     res.json (objRes);  
// }

exports.putUS = async(req,res,next)=>{

    let objRes = {
        msg: '',
        status: 0,
        data: {}
        };

        try {

            let id_tk = req.params.id;
            let dieuKien = {_id:id_tk};
            let validate = true;


            if(validate){
                let objTK = {};
                objTK.username = req.body.username;
                // objTK.email = req.body.email;
                objTK.image = req.body.image;
                objTK.address = req.body.address;
                // objTK.numberPhone = req.body.numberPhone;
                await md.tkModal.findByIdAndUpdate(id_tk,objTK);
                objRes.msg = "Cập nhật thành công";
                objRes.status = 1;

            }
            objRes.data = await md.tkModal.findById(dieuKien);
        } catch (error) {
            objRes.msg = error.message;
        }
        return res.json(objRes);
}

exports.putMK = async(req,res,next)=>{

    let objRes = {
        msg: '',
        status: 0,
        data: {}
        };

        try {

            let sdt = req.params.id;
            let dieuKien =   await md.tkModal.findOne({numberPhone :sdt });
            let validate = true;
            if(validate){
                let objTK = {};
                objTK.passwd = req.body.passwd;
                await md.tkModal.findOneAndUpdate(dieuKien, objTK);
                objRes.msg = "Cập nhật thành công";
                objRes.status = 1;

            }
            objRes.data = await md.tkModal.findOne({numberPhone :sdt });
        } catch (error) {
            objRes.msg = error.message;
        }
        return res.json(objRes);
}

exports.layTK = async(req,res,next)=>{
    let objRes = {
        msg: '',
        status: 0,
        data: {}
        };
        let sdt = req.params.sdt;
        try{
            if (  objRes.data = await md.tkModal.findOne({numberPhone : sdt})) {
              
                objRes.msg = "Lấy dữ liệu thành công";
            } else {
                objRes.msg = "Lấy dữ liệu Thất  Bại";
            }
            }catch(err){
            console.log(err);
            objRes.msg = err.message;
            }
            res.json(objRes.data);

}