var md1 = require('../modal/mau.model');
var fs = require('fs'); 

exports.mList = async (req,res,next) =>{
    // render ra view 

    let msg =''; 
    let list = null;
    let sl =  await md1.mauModal.find().count();

    let objU = req.session.userLogin;

    try {
        list = await md1.mauModal.find();
       msg = 'Lấy Dứ Liệu Thành CÔng';
   } catch (error) {
       console.log(error);
       msg = err.message;
   }

    res.render('mau/list',{listtl : list,msg :msg,sl:sl,objU:objU});

}


exports.mAdd = async (req,res,next) =>{
    // render ra view 

    console.log(req.body);
    let msg = ''; 
    let objU = req.session.userLogin;

    if(req.method == 'POST'){
        // validate đơn giản : 
        if(req.body.name.length<1 || req.body.colorcode.length<1){
            msg = "Không Được Để Trống";
            return  res.render('mau/add',{msg:msg  ,objU:objU });
        }
        // làm tương tự với các validate khác 

        try {
            // Kiểm tra xem màu sản phẩm đã tồn tại trong sản phẩm chưa
            const existingCate = await md1.mauModal.findOne({ name: req.body.name});
            const existingCate1 = await md1.mauModal.findOne({ colorcode: req.body.colorcode});
            if (existingCate || existingCate1) {
                // Nếu màu sản phẩm đã tồn tại, hiển thị thông báo và không thêm mới
                msg = "Đã Có Màu Này";
            } else {
                // Nếu màu sản phẩm chưa tồn tại, thêm mới vào cơ sở dữ liệu
                let objtl = new md1.mauModal();
                objtl.name = req.body.name;
                objtl.colorcode = req.body.colorcode;
               
                await objtl.save();
                msg = " Thêm Mầu  thành CÔng";
            }
        } catch (err) {
            msg = "Lỗi : " + err.message;
        }
    }
    res.render('mau/add',{msg:msg,objU:objU});
}


exports.mUp = async (req,res,next) =>{

    let id_m = req.params.id_m;
    let objtl =  {_id:'',name:''};
    let msg = '' ;
    let dieukien = {_id:id_m};


    try {
        // xử lí sư kiện post 
        if(req.method=='POST'){
            let name = req.body.name;
            let colorcode = req.body.colorcode;
          
            let validate = true;

            if(req.body.name.length<1 || req.body.colorcode.length<1){
                msg = "Không Được Để Trống ";    
                validate  = false;       
            }

            
        try {
            // Kiểm tra xem màu sản phẩm đã tồn tại trong sản phẩm chưa
            const existingCate = await md1.mauModal.findOne({ name: req.body.name});
            const existingCate1 = await md1.mauModal.findOne({ colorcode: req.body.colorcode});
            if (existingCate || existingCate1) {
                // Nếu màu sản phẩm đã tồn tại, hiển thị thông báo và không thêm mới
                msg = "Đã Có Màu Này";
            } else {
                // Nếu màu sản phẩm chưa tồn tại, thêm mới vào cơ sở dữ liệu
                if(validate){
                    let objtl_2  = {};
                    objtl_2.name = name;
                    objtl_2.colorcode = colorcode;
    
                    // tìm theo chuỗi id và update 
                    await md1.mauModal.findByIdAndUpdate(id_m,objtl_2);
                    msg = ' cập nhật thành công !';
    
                   
                }
            }
        } catch (err) {
            msg = "Lỗi : " + err.message;
        }
            // tạo đối tượng lưu csdl 
           
        };  
        objtl = await md1.mauModal.findById(dieukien);
    } catch (error) {
        msg = error.message;
    }


    res.render('mau/update',{msg:msg,obj:objtl});
}