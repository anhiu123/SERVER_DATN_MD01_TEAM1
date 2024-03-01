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
       
        try {
            
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

            // if(req.body.username.length<5){
            //     objRes.msg = "Username phải nhập ít nhất 5 ký tự";
            //     validate = false;
            // }
            // if(req.body.passwd.length ==0 || req.body.email.length ==0 || req.body.role.length ==0){
            //     objRes.msg = "Không ĐƯợc Để Trống";
            //     validate = false;
            // }   

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

            let id_tk = req.params.id;
            let dieuKien = {_id:id_tk};
            let validate = true;
            if(validate){
                let objTK = {};
                objTK.passwd = req.body.passwd;
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