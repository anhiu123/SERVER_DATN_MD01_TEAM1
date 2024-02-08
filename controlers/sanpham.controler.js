// var md = require('../modals/sanpham.modal');
var md = require('../modal/sanpham.modal');
var md1 = require('../modal/theloai.modal');
const mdMauSanPham = require('../modal/mausanpham.modal'); 
const Mau = require('../modal/mau.model');
var mdDH = require('../modal/donhang.modal');
var mdTK = require('../modal/taikhoan.modal');
var mdSPD = require('../modal/sanphamindon.modal');
var mdTB = require('../modal/thongbao.modal');
var fs = require('fs'); 
const moment = require('moment');
exports.spList = async (req, res, next) => {
    // render ra view 
    const loaiChon = req.query.loai;
    const role1 = req.query.role;
    let listloai = null;
    let msg = '';
    let list = null;
    let sl = await md.spModal.find().count();
    let listmauSP = null;
  

    listloai = await md1.tlModal.find();
    let mauList = null;

    let objU = req.session.userLogin;

    try {
        // Nếu loaiChon không được chọn, lấy toàn bộ danh sách sản phẩm
        if (!loaiChon) {
            listmauSP = await mdMauSanPham.mauSPModal.find();
            mauList = await Mau.mauModal.find();
            list = await md.spModal.find();
        } else {
            // Nếu có loaiChon, lọc danh sách sản phẩm theo loại chọn
            list = await md.spModal.find({ loai: loaiChon })
        }
        msg = 'Lấy Dữ Liệu Thành CÔNG';
    } catch (error) {
        console.log(error);
        msg = error.message;
    }
    res.render('sanpham/list', { listsp: list, msg: msg, sl: sl, role: role1, listloai: listloai, objU: objU ,listmauSP:listmauSP,mauList:mauList});
};


exports.Home = async (req,res,next) =>{
    // render ra view 
    let listDH = null;
    let objU = req.session.userLogin;
    let listTK = null;

    try {
        listDH = await mdDH.DonHangModal.find();
        listTK = await mdTK.tkModal.find();
        console.log(listDH);
    } catch (error) {
        
    }

    res.render('sanpham/home',{objU:objU,listDH:listDH,listTK:listTK});

}

exports.DHDetail = async (req,res,next) =>{
    // render ra view 
    let objU = req.session.userLogin;
    let id_dh = req.params.id_dh;
    let listsp = null;
    let listspd = null;
    let listmauSP = null;
    let mauList = null;
    let listDH = null;
    let listTK = null;
    let objDH_2  = null;

    try {
            listspd = await mdSPD.SPHModal.find({DonHangId : id_dh});
            listmauSP = await mdMauSanPham.mauSPModal.find();
            listDH = await mdDH.DonHangModal.find({_id  : id_dh });
            listsp = await md.spModal.find();
            listTK = await mdTK.tkModal.find();
            mauList = await Mau.mauModal.find();
        
    } catch (error) {
        console.log(error);
        msg = error.message;
    }

    if (req.method == "POST") {

        try {
            let objDH_2  = {};
            objDH_2.status = req.body.status;
            await mdDH.DonHangModal.findByIdAndUpdate(id_dh,objDH_2);

            res.render('sanpham/donhangdetail',{objU:objU ,listspd:listspd,listsp:listsp,listmauSP:listmauSP ,mauList:mauList,listDH:listDH , objDH_2:objDH_2});

        } catch (error) {
            
        }
        
    } else {
        
    }

   
    res.render('sanpham/donhangdetail',{objU:objU ,listspd:listspd,listsp:listsp,listmauSP:listmauSP ,mauList:mauList,listDH:listDH , objDH_2:objDH_2});

}

  
    exports.spAdd = async(req,res,next) =>{
    // render ra view 

    // console.log(req.body);
    let msg = ''; 
    let listloai = null;
   
    listloai = await md1.tlModal.find();
    let listmau = null;
    let objU = req.session.userLogin;
    console.log( req.session  );
    listmau = await Mau.mauModal.find();
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

        // dưới này ghi csdl 
        try{
            // tạo đối tượng ghi vào csdl
            const fullDateTimeString = moment().format('YYYY-MM-DD HH:mm:ss');
            let objsp = new md.spModal();
            objsp.name = req.body.name;
            objsp.image = "http://localhost:3000/uploads/" + req.file.originalname;
            objsp.mota = req.body.mota;
            objsp.price = req.body.price;
            objsp.loai = req.body.loai;
            objsp.timeCreate = fullDateTimeString;
            objsp.quantitySold = 0;
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

exports.spAddMau = async(req,res,next) =>{
    // render ra view 
    let listmau = null;
    let objU = req.session.userLogin;
    let id_sp = req.params.id_sp;
    listmau = await Mau.mauModal.find();
    let msg = "";

    if(req.method == 'POST'){
        // dưới này ghi csdl 
        try{
            // tạo đối tượng ghi vào csdl
            let objmsp = new mdMauSanPham.mauSPModal();
         
            objmsp.productId = id_sp;
            objmsp.colorId = req.body.mau;
            await objmsp.save();
            msg = " Thêm Màu Sản Phẩm  thành CÔng";
        }catch(err){
            msg = " Lỗi : " +err.message;
        }
    }
    res.render('sanpham/addmau',{listmau:listmau,objU:objU,msg:msg});
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



