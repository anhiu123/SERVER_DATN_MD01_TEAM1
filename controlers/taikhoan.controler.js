
var md = require('../modal/taikhoan.modal');
var md1 = require('../modal/admin.modal');

const bcrypt = require('bcrypt');
 // Số lượng vòng lặp để tạo ra salt, càng cao càng an toàn nhưng cũng tốn nhiều thời gian hơn


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

exports.tkListAdmin = async(req,res,next) =>{
    // render ra view 


    let list = null;
    let sl = await md1.adminModal.find().count();

    try {
        
        list = await md1.adminModal.find();

    } catch (error) {
        console.log(error);
    }

    res.render('taikhoan/listadmin',{listtk:list,sl:sl});

}

exports.tkAdd = async(req,res,next) =>{
    // render ra view 

    let msg = ''; 
    const saltRounds = 10;
    const hashPassword = async (plainPassword) => {
        try {
            const salt = await bcrypt.genSalt(saltRounds);
            const hash = await bcrypt.hash(plainPassword, salt);
            return hash;
        } catch (error) {
            throw new Error('Could not hash the password');
        }
    };

    if(req.method == 'POST'){

        if(req.body.username.length <4){
            msg = "Tên Đăng Nhập   nhập ít nhất 5 kí tự ";
            return  res.render('taikhoan/add',{msg:msg});
        }
        if(req.body.email.length ==0){
            msg = "Không Được Để Trống email";
            return  res.render('taikhoan/add',{msg:msg});
        }else {
            // Kiểm tra định dạng email bằng biểu thức chính quy (regular expression)
            const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!req.body.email.match(emailFormat)) {
                msg = "Định dạng email không hợp lệ";
                return res.render('taikhoan/add', { msg: msg });
            }
        }
        if(req.body.pass.length ==0){
            msg = "Không Được Để Trống PassWord";
            return  res.render('taikhoan/add',{msg:msg});
        }


        try {
            // Kiểm tra xem màu sản phẩm đã tồn tại trong sản phẩm chưa
            const existingCate = await md1.adminModal.findOne({ username: req.body.username });
            const existingCate1 = await md1.adminModal.findOne({email : req.body.email });
        
            if (existingCate || existingCate1) {
                // Nếu màu sản phẩm đã tồn tại, hiển thị thông báo và không thêm mới
                msg = "Đã Tồn Tại Tài Khoản Này";
            } else {
                // Nếu màu sản phẩm chưa tồn tại, thêm mới vào cơ sở dữ liệu
                let objtk = new md1.adminModal();
                objtk.username = req.body.username;
                objtk.email = req.body.email;
                objtk.passwd = await hashPassword(req.body.pass);
                if (req.body.admin === 'true') {
                    objtk.role = 'Admin';
                } else if (req.body.admin === 'false') {
                    objtk.role = 'User';
                } else {
                    msg = "Bạn chưa chọn vai trò!";
                    return res.render('taikhoan/add', { msg: msg });
                }

                await objtk.save();
                msg = "Đăng Kí Thành Công ! ";
                console.log(objtk);
            }
        } catch (err) {
            msg = "Lỗi : " + err.message;
        }
    }
    res.render('taikhoan/add',{msg:msg});
}

exports.tkDel = async(req,res,next) =>{
    let id_u = req.params.id_u;
    let obju =  {_id:'',name:''};
    let dieukien = {_id:id_u};

    obju = await md1.adminModal.findById(dieukien);

    if(req.method=='POST'){
        // Xóa 
        try {
            
            await md1.adminModal.findByIdAndDelete(id_u);
            res.send("Đã Xóa THành CÔng  . <a href='/taikhoan/admin'>DS</a>");

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

            await md1.adminModal.findByIdAndUpdate(id_tk,objU);
            msg = ' cập nhật thành công !';

        }

        }
        objtk = await md1.adminModal.findById(dieukien);

    } catch (error) {
        msg = error.message;
    }

    res.render('taikhoan/update',{msg:msg,obj:objtk});
}


exports.Login = async(req, res, next) => {
    let msg = '';
    const comparePasswords = async (plainPassword, hashedPassword) => {
        try {
            const match = await bcrypt.compare(plainPassword, hashedPassword);
            return match;
        } catch (error) {
            console.error('Error comparing passwords:', error);
            throw new Error('Could not compare the passwords');
        }
    };

    if (req.method == 'POST') {
        try {
            let objU = await md1.adminModal.findOne({ username: req.body.username });
            if (objU != null) {
                // Tồn tại username ==> kiểm tra password
                const passwordMatch = await comparePasswords(req.body.passwd, objU.passwd);
                if (passwordMatch) {
                    // Đúng thông tin tài khoản ==> lưu vào session
                    req.session.userLogin = objU;
                    // Chuyển trang về trang quản trị
                    return res.redirect('/sanpham/home');
                } else {
                    msg = 'Sai password';
                }
            } else {
                msg = 'Không tồn tại tài khoản: ' + req.body.username;
            }
        } catch (error) {
            msg = error.message;
        }
    }
    res.render('index', { msg: msg });
}
