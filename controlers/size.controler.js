var md1 = require('../modal/theloai.modal');
var fs = require('fs'); 

exports.szList = async (req,res,next) =>{
    // render ra view 

    let msg =''; 
    let list = null;
    let sl =  await md1.tlModal.find().count();

    let objU = req.session.userLogin;

    try {
        list = await md1.tlModal.find();
       msg = 'Lấy Dứ Liệu Thành CÔng';
   } catch (error) {
       console.log(error);
       msg = err.message;
   }

    res.render('size/list',{listtl : list,msg :msg,sl:sl,objU:objU});

}


exports.szAdd = async (req,res,next) =>{
    // render ra view 

    console.log(req.body);
    let msg = ''; 
    let objU = req.session.userLogin;

    if(req.method == 'POST'){
        // validate đơn giản : 
        if(req.body.name.length<1){
            msg = "Tên phải nhập ít nhất 1 kí tự ";
            return  res.render('sanpham/addloai',{msg:msg});
        }
        // làm tương tự với các validate khác 

        // dưới này ghi csdl 
        try{
            // tạo đối tượng ghi vào csdl
            let objtl = new md1.tlModal();
            objtl.name = req.body.name;
           
            await objtl.save();
            msg = " Thêm Thể Loại  thành CÔng";
        }catch(err){
            msg = " Lỗi : " +err.message;
        }
    }
    res.render('size/add',{msg:msg,objU:objU});
}