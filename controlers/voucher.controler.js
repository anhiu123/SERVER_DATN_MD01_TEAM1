var md1 = require('../modal/voucher.modal');
var fs = require('fs'); 
const moment = require('moment');

exports.vcList = async (req,res,next) =>{
    // render ra view 

    let msg =''; 
    let list = null;
    let sl =  await md1.VoucherModal.find().count();

    let objU = req.session.userLogin;

    try {
        list = await md1.VoucherModal.find();
       msg = 'Lấy Dứ Liệu Thành CÔng';
   } catch (error) {
       console.log(error);
       msg = err.message;
   }

    res.render('voucher/list',{listtl : list,msg :msg,sl:sl,objU:objU});

}

exports.vcAdd = async (req,res,next) =>{
    // render ra view 

  
    let msg = ''; 
    let objU = req.session.userLogin;
    let listtl = null;

    if(req.method == 'POST'){
        // validate đơn giản : 
        const fullDateTimeString = moment().format('YYYY-MM-DD HH:mm:ss');
        if(req.body.name.length<1 || req.body.content.length<1 || req.body.start_date.length<1  || req.body.end_date.length<1){
            msg = "Không Được Để Trống";
            return  res.render('voucher/add',{msg:msg , objU:objU});
        }
       
        
        try {
            fs.rename(req.file.path, "./public/uploads/" + req.file.originalname,(err)=>{
    
                if(err){
                    console.log(err);
                }else{
                    console.log("url : http://localhost:3000/uploads/" + req.file.originalname);
                }
    
            })
          } catch (error) {
            
          }
         
        // làm tương tự với các validate khác 
        try {
            // Kiểm tra xem màu sản phẩm đã tồn tại trong sản phẩm chưa
            const existingCate = await md1.VoucherModal.findOne({ name: req.body.name});
            const existingCate2 = await md1.VoucherModal.findOne({ content: req.body.content});

            const existingCate1 = await md1.VoucherModal.findOne({ image:  "https://server-datn-md01-team1.onrender.com/uploads/" + req.file.originalname });
        
            if (existingCate || existingCate1 || existingCate2) {
                // Nếu màu sản phẩm đã tồn tại, hiển thị thông báo và không thêm mới
                msg = "Đã Có VOucher Loại Này";
            } else {
                // Nếu màu sản phẩm chưa tồn tại, thêm mới vào cơ sở dữ liệu
                let objvc = new md1.VoucherModal();
                objvc.name = req.body.name;
                objvc.content = req.body.name;
                objvc.fromDate = req.body.name;
                objvc.price = req.body.price;
                objvc.toDate = req.body.name;
                objvc.create_time = fullDateTimeString;
                objvc.image =   "https://server-datn-md01-team1.onrender.com/uploads/" + req.file.originalname;
               
                await objvc.save();
                msg = " Thêm Voucher  thành CÔng";
            }
        } catch (err) {
            msg = "Lỗi : " + err.message;
        }
        // dưới này ghi csdl 
    }
    res.render('voucher/add',{msg:msg,objU:objU});
}

exports.vcDel = async (req,res,next) =>{

    let id_tl = req.params.id_tl;
    let objtl =  {_id:'',name:''};
    let dieukien = {_id:id_tl};

    objtl = await md1.VoucherModal.findById(dieukien);
    

    if(req.method=='POST'){
        // Xóa 
        try {
            
            await md1.VoucherModal.findByIdAndDelete(id_tl);
            res.send("Đã Xóa THành CÔng ${objSp.name} . <a href='/voucher'>DS</a>");

        } catch (error) {
            res.send(err.message);
        }
    }

    res.render('voucher/delete',{obj:objtl});


}


exports.vcUp = async (req,res,next) =>{

    let id_tl = req.params.id_tl;
    let objtl =  {_id:'',name:''};
    let msg = '' ;
    let dieukien = {_id:id_tl};
    let objU = req.session.userLogin;

    try {
        // xử lí sư kiện post 
        if(req.method=='POST'){
            let name = req.body.name;
            let price = req.body.price;
            let content = req.body.content;
            let fromDate = req.body.start_date;
            let toDate = req.body.end_date;
          
            let validate = true;

            if(req.body.name.length<1 ||  req.body.price.length<1 || req.body.content.length<1 || req.body.start_date.length<1  || req.body.end_date.length<1){
                msg = "Không Được Để Trống ";    
                validate  = false;       
            }

            try {
                fs.rename(req.file.path, "./public/uploads/" + req.file.originalname,(err)=>{
        
                    if(err){
                        console.log(err);
                    }else{
                        console.log("url : http://localhost:3000/uploads/" + req.file.originalname);
                    }
        
                })
              } catch (error) {
                
              }

              try {
                // Kiểm tra xem màu sản phẩm đã tồn tại trong sản phẩm chưa
                const existingCate = await md1.VoucherModal.findOne({ name: req.body.name});
                const existingCate1 = await md1.VoucherModal.findOne({ image:  "https://server-datn-md01-team1.onrender.com/uploads/" + req.file.originalname });
                const existingCate2 = await md1.VoucherModal.findOne({ content: req.body.content});
            
                if (existingCate || existingCate1 |existingCate2) {
                    // Nếu màu sản phẩm đã tồn tại, hiển thị thông báo và không thêm mới
                    msg = "Đã Có VOucher  Này";
                } else {
                    // Nếu màu sản phẩm chưa tồn tại, thêm mới vào cơ sở dữ liệu
                    if(validate){
                        let objtl_2  = {};
                        objtl_2.name = name;
                        objtl_2.content = content;
                        objtl_2.price = price;
                        objtl_2.fromDate = fromDate;
                        objtl_2.toDate = toDate;
                        objtl_2.image =   "https://server-datn-md01-team1.onrender.com/uploads/" + req.file.originalname;
        
                        // tìm theo chuỗi id và update 
                        await md1.VoucherModal.findByIdAndUpdate(id_tl,objtl_2);
                        msg = ' cập nhật thành công !';
        
                       
                    }
                }
            } catch (err) {
                msg = "Lỗi : " + err.message;
            }

            // tạo đối tượng lưu csdl 
           
        };  
        objtl = await md1.VoucherModal.findById(dieukien);
    } catch (error) {
        msg = error.message;
    }


    res.render('voucher/update',{msg:msg,obj:objtl,objU:objU});
}