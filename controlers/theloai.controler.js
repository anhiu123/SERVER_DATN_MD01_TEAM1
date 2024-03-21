var md1 = require('../modal/theloai.modal');
var fs = require('fs'); 

exports.tlList = async (req,res,next) =>{
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

    res.render('theloai/listloai',{listtl : list,msg :msg,sl:sl,objU:objU});

}

exports.tlAdd = async (req,res,next) =>{
    // render ra view 

    console.log(req.body);
    let msg = ''; 
    let objU = req.session.userLogin;
    let listtl = null;

    if(req.method == 'POST'){
        // validate đơn giản : 
        if(req.body.name.length<1){
            msg = "Tên phải nhập ít nhất 1 kí tự ";
            return  res.render('theloai/addloai',{msg:msg , objU:objU});
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
            const existingCate = await md1.tlModal.findOne({ name: req.body.name});
            const existingCate1 = await md1.tlModal.findOne({ image:  "https://server-datn-md01-team1.onrender.com/uploads/" + req.file.originalname });
        
            if (existingCate || existingCate1) {
                // Nếu màu sản phẩm đã tồn tại, hiển thị thông báo và không thêm mới
                msg = "Đã Có Thể Loại Này";
            } else {
                // Nếu màu sản phẩm chưa tồn tại, thêm mới vào cơ sở dữ liệu
                let objtl = new md1.tlModal();
                objtl.name = req.body.name;
              
                objtl.image =  "https://server-datn-md01-team1.onrender.com/uploads/"  + req.file.originalname;
                await objtl.save();
                msg = " Thêm Thể Loại  thành CÔng";
            }
        } catch (err) {
            msg = "Lỗi : " + err.message;
        }
        // dưới này ghi csdl 
    }
    res.render('theloai/addloai',{msg:msg,objU:objU});
}

exports.tlDel = async (req,res,next) =>{

    let id_tl = req.params.id_tl;
    let objtl =  {_id:'',name:''};
    let dieukien = {_id:id_tl};

    objtl = await md1.tlModal.findById(dieukien);
    

    if(req.method=='POST'){
        // Xóa 
        try {
            
            await md1.tlModal.findByIdAndDelete(id_tl);
            res.send("Đã Xóa THành CÔng ${objSp.name} . <a href='/theloai'>DS</a>");

        } catch (error) {
            res.send(err.message);
        }
    }

    res.render('theloai/deletel',{obj:objtl});


}


exports.tlUp = async (req,res,next) =>{

    let id_tl = req.params.id_tl;
    let objtl =  {_id:'',name:''};
    let msg = '' ;
    let dieukien = {_id:id_tl};


    try {
        // xử lí sư kiện post 
        if(req.method=='POST'){
            let name = req.body.name;
          
            let validate = true;

            if(req.body.name.length<1){
                msg = "Tên Thể Loại phải nhập ít nhất 1 kí tự ";    
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
                const existingCate = await md1.tlModal.findOne({ name: req.body.name});
                const existingCate1 = await md1.tlModal.findOne({ image:  "https://server-datn-md01-team1.onrender.com/uploads/" + req.file.originalname });
            
                if (existingCate || existingCate1) {
                    // Nếu màu sản phẩm đã tồn tại, hiển thị thông báo và không thêm mới
                    msg = "Đã Có Thể Loại Này";
                } else {
                    // Nếu màu sản phẩm chưa tồn tại, thêm mới vào cơ sở dữ liệu
                    if(validate){
                        let objtl_2  = {};
                        objtl_2.name = name;
                        objtl_2.image =   "https://server-datn-md01-team1.onrender.com/uploads/" + req.file.originalname;
        
                        // tìm theo chuỗi id và update 
                        await md1.tlModal.findByIdAndUpdate(id_tl,objtl_2);
                        msg = ' cập nhật thành công !';
        
                       
                    }
                }
            } catch (err) {
                msg = "Lỗi : " + err.message;
            }

            // tạo đối tượng lưu csdl 
           
        };  
        objtl = await md1.tlModal.findById(dieukien);
    } catch (error) {
        msg = error.message;
    }


    res.render('theloai/updatel',{msg:msg,obj:objtl});
}