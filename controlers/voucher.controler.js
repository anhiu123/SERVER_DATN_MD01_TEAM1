var md1 = require('../modal/voucher.modal');

const moment = require('moment');

const admin = require('firebase-admin');
const fs = require('fs-extra');
const path = require('path');


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
    var admin = require("firebase-admin");

    var serviceAccount = require("./serviceAcount.json");
    
    if (!admin.apps.length) { // Kiểm tra xem Firebase đã được khởi tạo chưa
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            storageBucket: "vidu2-96b2f.appspot.com"
        });
    }
    
    const bucket = admin.storage().bucket();
    function uploadToFirebaseStorage(filePath, originalName) {
        return new Promise((resolve, reject) => {
            bucket.upload(
                filePath,
                {
                    destination: 'uploads/' + originalName, // Đường dẫn trên Firebase Cloud Storage
                    metadata: {
                        contentType: 'image/jpeg' // Định dạng của file (ở đây là ví dụ cho file ảnh JPEG)
                    }
                },
                (err, file) => {
                    if (err) {
                        console.error('Error uploading file to Firebase Storage:', err);
                        reject(err);
                    } else {
                        // Lấy đường dẫn URL của ảnh trên Firebase Storage
                        const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(file.name)}?alt=media`;
    
                        // Trả về đường dẫn URL của ảnh
                        resolve(imageUrl);
                    }
                }
            );
        });
    }
  

    let msg = ''; 
    let objU = req.session.userLogin;
    let listtl = null;

    if(req.method == 'POST'){
        // validate đơn giản : 
        const tempFilePath = req.file.path;
        // Tên gốc của file
        const originalFileName = req.file.originalname;

        
        try {
            fs.rename(tempFilePath, './public/uploads/' + originalFileName, (err) => {
              if (err) {
                console.error('Error renaming file:', err);
                return res.status(500).json({ error: 'Error renaming file' });
              } else {
                console.log('File renamed successfully');
                // Sau khi rename file, gọi hàm uploadToFirebaseStorage để upload lên Firebase
                uploadToFirebaseStorage('./public/uploads/' + originalFileName, originalFileName)
                  .then(() => {
                    console.log('File uploaded to Firebase successfully');
                    // Nếu muốn redirect hoặc render trang khác sau khi upload thành công
                    // res.redirect('url');
                    // hoặc
                    // res.render('view');
                  })
                  .catch((uploadError) => {
                    console.error('Error uploading file to Firebase:', uploadError);
                    res.status(500).json({ error: 'Error uploading file to Firebase' });
                  });
              }
            });
          } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Error uploading file' });
          }
        


        const fullDateTimeString = moment().format('YYYY-MM-DD HH:mm:ss');
        if(req.body.name.length<1 || req.body.content.length<1 || req.body.start_date.length<1  || req.body.end_date.length<1){
            msg = "Không Được Để Trống";
            return  res.render('voucher/add',{msg:msg , objU:objU});
        }
       
    
         
        // làm tương tự với các validate khác 
        try {
            const imageUrl = await uploadToFirebaseStorage('./public/uploads/' + originalFileName, originalFileName);
        
            // Kiểm tra xem màu sản phẩm đã tồn tại trong sản phẩm chưa
            const existingCate = await md1.VoucherModal.findOne({ name: req.body.name});
            const existingCate2 = await md1.VoucherModal.findOne({ content: req.body.content});

            const existingCate1 = await md1.VoucherModal.findOne({ image:  imageUrl });
        
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
                objvc.image =  imageUrl;
               
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

    var admin = require("firebase-admin");

    var serviceAccount = require("./serviceAcount.json");
    
    if (!admin.apps.length) { // Kiểm tra xem Firebase đã được khởi tạo chưa
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            storageBucket: "vidu2-96b2f.appspot.com"
        });
    }
    
    const bucket = admin.storage().bucket();
    function uploadToFirebaseStorage(filePath, originalName) {
        return new Promise((resolve, reject) => {
            bucket.upload(
                filePath,
                {
                    destination: 'uploads/' + originalName, // Đường dẫn trên Firebase Cloud Storage
                    metadata: {
                        contentType: 'image/jpeg' // Định dạng của file (ở đây là ví dụ cho file ảnh JPEG)
                    }
                },
                (err, file) => {
                    if (err) {
                        console.error('Error uploading file to Firebase Storage:', err);
                        reject(err);
                    } else {
                        // Lấy đường dẫn URL của ảnh trên Firebase Storage
                        const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(file.name)}?alt=media`;
    
                        // Trả về đường dẫn URL của ảnh
                        resolve(imageUrl);
                    }
                }
            );
        });
    }
    objtl = await md1.VoucherModal.findById(dieukien);
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

            const tempFilePath = req.file.path;
            // Tên gốc của file
            const originalFileName = req.file.originalname;
    
            
            try {
                fs.rename(tempFilePath, './public/uploads/' + originalFileName, (err) => {
                  if (err) {
                    console.error('Error renaming file:', err);
                    return res.status(500).json({ error: 'Error renaming file' });
                  } else {
                    console.log('File renamed successfully');
                    // Sau khi rename file, gọi hàm uploadToFirebaseStorage để upload lên Firebase
                    uploadToFirebaseStorage('./public/uploads/' + originalFileName, originalFileName)
                      .then(() => {
                        console.log('File uploaded to Firebase successfully');
                        // Nếu muốn redirect hoặc render trang khác sau khi upload thành công
                        // res.redirect('url');
                        // hoặc
                        // res.render('view');
                      })
                      .catch((uploadError) => {
                        console.error('Error uploading file to Firebase:', uploadError);
                        res.status(500).json({ error: 'Error uploading file to Firebase' });
                      });
                  }
                });
              } catch (error) {
                console.error('Error:', error);
                res.status(500).json({ error: 'Error uploading file' });
              }
              const imageUrl = await uploadToFirebaseStorage('./public/uploads/' + originalFileName, originalFileName);

              if(req.body.name == objtl.name && imageUrl == objtl.image && objtl.content == req.body.content) {

                await md1.VoucherModal.findByIdAndUpdate(id_tl,objtl);
                msg = ' cập nhật thành công !';
               
            }else if(req.body.name == objtl.name || imageUrl == objtl.image && objtl.content == req.body.content){
                if(imageUrl != objtl.image || req.body.name != objtl.name || objtl.content != req.body.content) {
                    objtl.image = imageUrl;
                    objtl.name = req.body.name ;
                    objtl.content = req.body.content ;
                    await md1.VoucherModal.findByIdAndUpdate(id_tl,objtl);
                    msg = " Cập Nhật THành CÔng !";
                }

            }else{
                try {
                    // Kiểm tra xem màu sản phẩm đã tồn tại trong sản phẩm chưa
                    const existingCate = await md1.VoucherModal.findOne({ name: req.body.name});
                    const existingCate1 = await md1.VoucherModal.findOne({ image:  imageUrl });
                    const existingCate2 = await md1.VoucherModal.findOne({ content: req.body.content});
                
                    if (existingCate || existingCate1 || existingCate2) {
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
                            objtl_2.image =  imageUrl;
            
                            // tìm theo chuỗi id và update 
                            await md1.VoucherModal.findByIdAndUpdate(id_tl,objtl_2);
                            msg = ' cập nhật thành công !';
            
                           
                        }
                    }
                } catch (err) {
                    msg = "Lỗi : " + err.message;
                }
            }

              try {
                // Kiểm tra xem màu sản phẩm đã tồn tại trong sản phẩm chưa
                const existingCate = await md1.VoucherModal.findOne({ name: req.body.name});
                const existingCate1 = await md1.VoucherModal.findOne({ image:  imageUrl });
                const existingCate2 = await md1.VoucherModal.findOne({ content: req.body.content});
            
                if (existingCate || existingCate1 || existingCate2) {
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
                        objtl_2.image =  imageUrl;
        
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