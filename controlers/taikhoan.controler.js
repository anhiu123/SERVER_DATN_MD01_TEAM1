
var md = require('../modal/taikhoan.modal');

exports.tkList = async(req,res,next) =>{
    // render ra view 


    let list = null;
    let sl = await md.tkModal.find().count();

    try {
        
        list = await md.tkModal.find();

    } catch (error) {
        console.log(error);
    }

    res.render('taikhoan/list',{listtk:list,sl:sl});

}

exports.tkAdd = async(req,res,next) =>{
    // render ra view 

    let msg = ''; 

    if(req.method == 'POST'){

        if(req.body.username.length <4){
            msg = "Tên Sản Phẩm phải nhập ít nhất 5 kí tự ";
            return  res.render('taikhoan/add',{msg:msg});
        }
        if(req.body.email.length ==0){
            msg = "Không Được Để Trống email";
            return  res.render('taikhoan/add',{msg:msg});
        }
        if(req.body.pass.length ==0){
            msg = "Không Được Để Trống PassWord";
            return  res.render('taikhoan/add',{msg:msg});
        }
        try {
            
                let objtk = new md.tkModal();
                objtk.username = req.body.username;
                objtk.email = req.body.email;
                objtk.passwd = req.body.pass;
                if(req.body.admin === 'true'){
                        objtk.role ='Admin'
                }else if(req.body.user === 'false'){
                    objtk.role ='User'
                }else{
                    msg = "Bạn Chưa Chọn Vai Trò !";
                    return  res.render('taikhoan/add',{msg:msg});
                }

                await objtk.save();
                msg = "Đăng Kí Thành Công ! ";
                console.log(objtk);
        } catch (error) {
            msg = error.message;
        }

    }


    res.render('taikhoan/add',{msg:msg});

}


exports.tkDel = async(req,res,next) =>{


    let id_u = req.params.id_u;
    let obju =  {_id:'',name:''};
    let dieukien = {_id:id_u};

    obju = await md.tkModal.findById(dieukien);
    

    if(req.method=='POST'){
        // Xóa 
        try {
            
            await md.tkModal.findByIdAndDelete(id_u);
            res.send("Đã Xóa THành CÔng  . <a href='/taikhoan'>DS</a>");

        } catch (error) {
            res.send(err.message);
        }
    }

    res.render('taikhoan/delete',{obj:obju});
}

exports.tkUp = async(req,res,next) =>{

    let id_tk = req.params.id_u;
    let objtk =  {_id:'',name:'',email:'',passwd:'',role:''};
    let msg = '' ;
    let dieukien = {_id:id_tk};

    try {
        
        if(req.method == 'POST'){

            let username = req.body.username;
            let email = req.body.email;
            let pass = req.body.pass;
            let role = '';
            let validate = true;
            if(req.body.admin === 'true'){
               role = 'Admin'
          }else if(req.body.user === 'false'){
                role = 'User'
          }else{
            msg = "Bạn Chưa Chọn Vai Trò !";
          validate= false;
        }
        if(req.body.username.length === 0 || req.body.email.length === 0 || req.body.pass.length === 0){
            validate= false;
        }
        
        if(validate){

            let objU = {};
            objU.username = username;
            objU.email = email;
            objU.passwd = pass;
            objU.role = role;

            await md.tkModal.findByIdAndUpdate(id_tk,objU);
            msg = ' cập nhật thành công !';

        }

        }
        objtk = await md.tkModal.findById(dieukien);

    } catch (error) {
        msg = error.message;
    }

    res.render('taikhoan/update',{msg:msg,obj:objtk});
}


exports.Login = async(req,res,next)=>{

    let msg = '';
    if(req.method == 'POST'){
        try {
            let objU = await md.tkModal.findOne({username: req.body.username});
            console.log(objU);
            if(objU != null ){
                // tồn tại username ==> kiểm tra passwd
                if(objU.passwd == req.body.passwd){
                    // đúng thông tin tài khoản ==> lưu vào session
                    req.session.userLogin = objU; 
                    // chuyển trang về trang quản trị
                    return res.redirect('/sanpham/home');
                }else{
                    msg = 'Sai password';
                }

            }else{
                msg = 'Không tồn tại tài khoản: ' + req.body.username;
            }

        } catch (error) {
            msg = error.message;
        }
    } 

    res.render('index', {msg:msg})

}