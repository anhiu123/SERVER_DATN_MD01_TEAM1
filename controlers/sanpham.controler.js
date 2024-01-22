// var md = require('../modals/sanpham.modal');
var md = require('../modal/sanpham.modal');
var md1 = require('../modal/theloai.modal');
var fs = require('fs'); 
exports.spList = async (req,res,next) =>{
    // render ra view 
    const loaiChon = req.query.loai;
    const role1 = req.query.role;
    let listloai = null;
    let msg =''; 
    let list = null;
    let sl =  await md.spModal.find().count();

    listloai = await md1.tlModal.find();

    let objU = req.session.userLogin;

    try {
        // Nếu loaiChon không được chọn, lấy toàn bộ danh sách sản phẩm
        if (!loaiChon) {
          list = await md.spModal.find();
        } else {
          // Nếu có loaiChon, lọc danh sách sản phẩm theo loại chọn
          list = await md.spModal.find({ loai: loaiChon });
        }
    
        msg = 'Lấy Dữ Liệu Thành CÔng';
      } catch (error) {
        console.log(error);
        msg = err.message;
      }


    res.render('sanpham/list',{listsp : list,msg :msg,sl:sl,role:role1,listloai:listloai,objU:objU});

}

exports.Home = async (req,res,next) =>{
    // render ra view 

    let objU = req.session.userLogin;
    res.render('sanpham/home',{objU:objU});

}

  
    exports.spAdd = async(req,res,next) =>{
    // render ra view 

    console.log(req.body);
    let msg = ''; 
    let listloai = null;

    listloai = await md1.tlModal.find();

    let objU = req.session.userLogin;
    console.log( req.session  );

    if(req.method == 'POST'){
        // validate đơn giản : 
        // if(req.body.name.length<5){
        //     msg = "Tên Sản Phẩm phải nhập ít nhất 5 kí tự ";
        //     return  res.render('sanpham/add',{msg:msg});
        // }
        // if(req.body.mota.length ==0 || req.body.price.length ==0 || req.body.loai.length ==0){
        //     msg = "Không Được Để Trống";
        //     return  res.render('sanpham/add',{msg:msg});
        // }
        // làm tương tự với các validate khác 


        fs.rename(req.file.path, "./public/uploads/" + req.file.originalname,(err)=>{

            if(err){
                console.log(err);
            }else{
                console.log("url : http://localhost:3000/uploads/" + req.file.originalname);
            }

        })

        // dưới này ghi csdl 
        try{
            // tạo đối tượng ghi vào csdl
            let objsp = new md.spModal();
            objsp.name = req.body.name;
            objsp.image = "http://localhost:3000/uploads/" + req.file.originalname;
            objsp.mota = req.body.mota;
            objsp.price = req.body.price;
            objsp.loai = req.body.loai;
  
           
            await objsp.save();
            msg = " Thêm Sản Phẩm  thành CÔng";

            console.log( req.session.addSP = objsp );
          

        }catch(err){
            msg = " Lỗi : " +err.message;
        }
        

    }
    console.log( req.session  );

    res.render('sanpham/add',{msg:msg,list:listloai,objU:objU});

}

exports.spSearch = async (req,res,next) =>{
    // render ra view 

    let msg = '';
    let list = null;

    let objU = req.session.userLogin;

    try {
        let timKiem = req.query.name; // Lấy từ query parameter
        let query = {}; // Đây là đối tượng truy vấn MongoDB trống ban đầu
    
        // Nếu có tìm kiếm sản phẩm theo tên
        if (timKiem && timKiem.trim() !== '') {
          // Sử dụng toán tử $regex của MongoDB để tìm kiếm sản phẩm theo tên
          query.name = { $regex: new RegExp(timKiem, 'i') };
        }
    
        // Tìm kiếm sản phẩm dựa trên query
        list = await md.spModal.find(query);
    
        msg = 'Lấy Dữ Liệu Thành CÔng';
      } catch (error) {
        console.log(error);
        msg = err.message;
      }
    


    res.render('sanpham/search',{msg:msg,list:list,objU:objU});

}

exports.spDel = async (req,res,next) =>{

    let id_sp = req.params.id_sp;
    let objSp =  {_id:'',name:'',image:'',mota:'',loai:'',price:0};
    let dieukien = {_id:id_sp};

    objSp = await md.spModal.findById(dieukien);
    

    if(req.method=='POST'){
        // Xóa 
        try {
            
            await md.spModal.findByIdAndDelete(id_sp);
            res.send("Đã Xóa THành CÔng ${objSp.name} . <a href='/sanpham'>DS</a>");

        } catch (error) {
            res.send(err.message);
        }
    }

    res.render('sanpham/delete',{obj:objSp});

}


exports.spUpdate = async (req,res,next) =>{

    let id_sp = req.params.id_sp;
    let objSp =  {_id:'',name:'',image:'',mota:'',loai:'',price:0};
    let msg = '' ;
    let dieukien = {_id:id_sp};
   
   
    try {
        // xử lí sư kiện post 
        if(req.method=='POST'){

            fs.rename(req.file.path, "./public/uploads/" + req.file.originalname,(err)=>{

                if(err){
                    console.log(err);
                }else{
                    console.log("url : http://localhost:3000/uploads/" + req.file.originalname);
                }
    
            })


            let name = req.body.name;
            let image = "http://localhost:3000/uploads/" + req.file.originalname;
            let mota = req.body.mota;
            let loai = req.body.loai;
            let price = req.body.price;
            let validate = true;

            if(req.body.name.length ==0 || req.body.mota.length ==0 || req.body.loai.length ==0 || req.body.price.length ==0){
                msg = "Không Được Để Trống ";    
                validate  = false;       
            }
            // tạo đối tượng lưu csdl 
            if(validate){
                let objSp_2  = {};
                objSp_2.name = name;
                objSp_2.image = image;
                objSp_2.mota = mota;
                objSp_2.loai = loai;
                objSp_2.price = price;
              
                // tìm theo chuỗi id và update 
                await md.spModal.findByIdAndUpdate(id_sp,objSp_2);
                msg = ' cập nhật thành công !';

               
            }
        };  
        objSp = await md.spModal.findById(dieukien);
    } catch (error) {
        msg = error.message;
    }
    res.render('sanpham/update',{msg:msg,obj:objSp});

}



