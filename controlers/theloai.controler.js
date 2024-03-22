var md1 = require('../modal/theloai.modal');
// var fs = require('fs'); 

const admin = require('firebase-admin');
const fs = require('fs-extra');
const path = require('path');

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
        
        // làm tương tự với các validate khác 
        try {
            const imageUrl = await uploadToFirebaseStorage('./public/uploads/' + originalFileName, originalFileName);
        
            // Kiểm tra xem màu sản phẩm đã tồn tại trong sản phẩm chưa
            const existingCate = await md1.tlModal.findOne({ name: req.body.name});
            const existingCate1 = await md1.tlModal.findOne({ image: imageUrl });
        
            if (existingCate || existingCate1) {
                // Nếu màu sản phẩm đã tồn tại, hiển thị thông báo và không thêm mới
                msg = "Đã Có Thể Loại Này";
            } else {
                // Nếu màu sản phẩm chưa tồn tại, thêm mới vào cơ sở dữ liệu
                let objtl = new md1.tlModal();
                objtl.name = req.body.name;
            
                // Lưu đường dẫn URL của ảnh vào trường image của objtl
                objtl.image = imageUrl;
        
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

    objtl = await md1.tlModal.findById(dieukien);
    try {
        // xử lí sư kiện post 
        if(req.method=='POST'){
          
            
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
        
            if(req.body.name == objtl.name && imageUrl == objtl.image) {

                await md1.tlModal.findByIdAndUpdate(id_tl,objtl);
                msg = ' cập nhật thành công !';
               
            }else if(req.body.name == objtl.name){
               if(imageUrl != objtl.image){
                objtl.image = imageUrl;
                await md1.tlModal.findByIdAndUpdate(id_tl,objtl);
                msg = ' cập nhật thành công !';
               
               }
            }else if(imageUrl == objtl.image) {
                if(req.body.name != objtl.name){
                    objtl.name = req.body.name;
                    await md1.tlModal.findByIdAndUpdate(id_tl,objtl);
                    msg = ' cập nhật thành công !';
                   
                   }
            }else{
                let validate = true;

                if(req.body.name.length<1){
                    msg = "Tên Thể Loại phải nhập ít nhất 1 kí tự ";    
                    validate  = false;       
                }
                  try {
                   
                    // Kiểm tra xem màu sản phẩm đã tồn tại trong sản phẩm chưa
                    const existingCate = await md1.tlModal.findOne({ name: req.body.name});
                    const existingCate1 = await md1.tlModal.findOne({ image: imageUrl });
                
                    if (existingCate || existingCate1) {
                        // Nếu màu sản phẩm đã tồn tại, hiển thị thông báo và không thêm mới
                        msg = "Đã Có Thể Loại Này";
                    } else {
                        // Nếu màu sản phẩm chưa tồn tại, thêm mới vào cơ sở dữ liệu
                        if(validate){
                            let objtl_2  = {};
                            objtl_2.name = req.body.name;
                            objtl_2.image =  imageUrl;
            
                            // tìm theo chuỗi id và update 
                            await md1.tlModal.findByIdAndUpdate(id_tl,objtl_2);
                            msg = ' cập nhật thành công !';
            
                           
                        }
                    }
                } catch (err) {
                    msg = "Lỗi : " + err.message;
                }
            }

        };  
       
    } catch (error) {
        msg = error.message;
    }


    res.render('theloai/updatel',{msg:msg,obj:objtl});
}