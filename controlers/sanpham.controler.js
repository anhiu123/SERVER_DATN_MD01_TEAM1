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
            listmauSP = await mdMauSanPham.mauSPModal.find();
            mauList = await Mau.mauModal.find();
            // Nếu có loaiChon, lọc danh sách sản phẩm theo loại chọn
            list = await md.spModal.find({ category: loaiChon })
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
        listDH = await mdDH.DonHangModal.find({ status: { $ne: "Đã giao" } });

        listTK = await mdTK.tkModal.find();
      //  console.log(listDH);
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
    let listDH1= null;
    let listsize = null;
    let listm = null;

    try {
            listspd = await mdSPD.SPHModal.find({OrderId : id_dh});
            listmauSP = await mdMauSanPham.mauSPModal.find();
            listDH = await mdDH.DonHangModal.find({_id  : id_dh });
            listsp = await md.spModal.find();
            listDH1 = await mdDH.DonHangModal.find({ status: { $ne: "Đã giao" } });
            listTK = await mdTK.tkModal.find();
            mauList = await Mau.mauModal.find();
        
    } catch (error) {
        console.log(error);
        msg = error.message;
    }

    if (req.method == "POST") {
      //  console.log(listmauSP + " thuộc tính sp  ");
        if (req.body.status == "Đã giao") {
            try {
                // them số lượng 
                listspd.forEach(async spd => {
                    let foundProduct = listsp.find(sp => sp._id.toString() === spd.ProductId.toString());
                    
                    if (foundProduct && spd.OrderId.toString() === id_dh.toString()) {
                        foundProduct.quantitySold += parseInt(spd.Quantity);
                        await md.spModal.findByIdAndUpdate(foundProduct._id, { quantitySold: foundProduct.quantitySold });
                    }
                });
                
                // Lặp qua mỗi phần tử trong listspd
                listspd.forEach(spd => {
                    // Kiểm tra xem SanPhamId có tồn tại trong listsp hay không
                 
                    listmauSP.forEach(msp => {
                                msp.sizes.forEach(sz => {
                                    if(sz._id.toString() == spd.PropertiesId.toString()){
                                        (async () => {
                                        sz.quantity  =   sz.quantity  - spd.Quantity;   
                                        await mdMauSanPham.mauSPModal.findByIdAndUpdate(msp._id, msp);
                                    })();
                            }

                    });
                    
                });
                });
             
            } catch (error) {
                
            }
        } else {
            
        }

        try {
            const fullDateTimeString = moment().format('YYYY-MM-DD HH:mm:ss');
            let objDH_2  = {};
            objDH_2.status = req.body.status;
            await mdDH.DonHangModal.findByIdAndUpdate(id_dh,objDH_2);
            let objtb = new mdTB.ThongBaoModal();
            listTK.forEach((tk) => {
                // Thực hiện các hành động với mỗi phần tử trong mảng
                listDH.forEach((dh) => {
                    // Thực hiện các hành động với mỗi phần tử trong mảng
                    if (tk._id.toString() === dh.UserId.toString()) {
                        objtb.UserId =  tk._id;
                        objtb.status =  "Đơn Hàng "  + dh._id + " Của Bạn Đã Được : " + req.body.status;
                    } else {
                        // Thực hiện hành động khi không có điều kiện nào được thỏa mãn
                    }
                });
            });   
            objtb.date = fullDateTimeString;
            await objtb.save();



            res.redirect(req.originalUrl);
           // res.render('sanpham/donhangdetail',{objU:objU ,listspd:listspd,listsp:listsp,listmauSP:listmauSP ,mauList:mauList,listDH:listDH , objDH_2:objDH_2});

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
        const existingSP = await md.spModal.findOne({ name: req.body.name});
        const existingSP1 = await md.spModal.findOne({ image:"http://localhost:3000/uploads/" + req.file.originalname });
      

        if (existingSP || existingSP1) {
            // Nếu màu sản phẩm đã tồn tại, hiển thị thông báo và không thêm mới
            msg = "Đã Có Sản Phẩm Này";
        } else {
            // Nếu màu sản phẩm chưa tồn tại, thêm mới vào cơ sở dữ liệu
            try{
                // tạo đối tượng ghi vào csdl
                const fullDateTimeString = moment().format('YYYY-MM-DD HH:mm:ss');
                let objsp = new md.spModal();
                objsp.name = req.body.name;
                 objsp.image = "http://localhost:3000/uploads/" + req.file.originalname;
                objsp.describe = req.body.describe;
                objsp.price = req.body.price;
                objsp.category = req.body.loai;
                objsp.timeCreate = fullDateTimeString;
                objsp.quantitySold = 0;
                await objsp.save();
                msg = " Thêm Sản Phẩm  thành CÔng";
                console.log( req.session.addSP = objsp );
            }catch(err){
                msg = " Lỗi : Bạn Chưa Chọn Ảnh" ;
            }
        }
    } catch (err) {
        msg = "Lỗi : " + err.message;
    }
        // dưới này ghi csdl 
     
        

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
    let listmsp = null;

    const sizes = [
        { size: "S", quantity: req.body.sizeS },
        { size: "M", quantity: req.body.sizeM },
        { size: "L", quantity: req.body.sizeL },
        { size: "XL", quantity: req.body.sizeXL }
      ];

    if(req.method == 'POST'){
        listmsp = mdMauSanPham.mauSPModal.find();

        try {
            fs.rename(req.file.path, "./public/uploads/" + req.file.originalname,(err)=>{
    
                if(err){
                    console.log(err);
                    msg = " Chưa Chọn Ảnh"
                }else{
                    console.log("url : http://localhost:3000/uploads/" + req.file.originalname);
                }
    
            })
          } catch (error) {   
            msg = "Chưa Thêm Ảnh ";
          }

          try {
            // Kiểm tra xem màu sản phẩm đã tồn tại trong sản phẩm chưa
            const existingColor = await mdMauSanPham.mauSPModal.findOne({ productId: id_sp, colorId: req.body.mau });
        
            if (existingColor) {
                // Nếu màu sản phẩm đã tồn tại, hiển thị thông báo và không thêm mới
                msg = "Đã Có Màu Này Trong Sản Phẩm";
            } else {
                // Nếu màu sản phẩm chưa tồn tại, thêm mới vào cơ sở dữ liệu
                let objmsp = new mdMauSanPham.mauSPModal();
                objmsp.productId = id_sp;
                objmsp.colorId = req.body.mau;
                objmsp.image = "http://localhost:3000/uploads/" + req.file.originalname;
                objmsp.sizes = sizes;
                await objmsp.save();
                msg = "Thêm Màu Sản Phẩm thành CÔng";
            }
        } catch (err) {
            msg = "Lỗi : Chưa Chọn Ảnh " ;
        }
    }
    res.render('sanpham/addmau',{listmau:listmau,objU:objU,msg:msg});
}
exports.spSearch = async (req,res,next) =>{
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
            listmauSP = await mdMauSanPham.mauSPModal.find();
            mauList = await Mau.mauModal.find();
            // Nếu có loaiChon, lọc danh sách sản phẩm theo loại chọn
            list = await md.spModal.find({ category: loaiChon })
        }
        msg = 'Lấy Dữ Liệu Thành CÔNG';
    } catch (error) {
        console.log(error);
        msg = error.message;
    }

    try {loai
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
    


    res.render('sanpham/search', { listsp: list, msg: msg, sl: sl, role: role1, listloai: listloai, objU: objU ,listmauSP:listmauSP,mauList:mauList});
    //

}
exports.spDel = async (req,res,next) =>{

    let id_sp = req.params.id_sp;
    let objSp =  {_id:'',name:'',image:'',describe:'',category:'',price:0};
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
    let objSp =  {_id:'',name:'',image:'',describe:'',category:'',price:0};
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
            let describe = req.body.describe;
            let loai = req.body.loai;
            let price = req.body.price;
            let validate = true;

            if(req.body.name.length ==0 || req.body.describe.length ==0 || req.body.loai.length ==0 || req.body.price.length ==0){
                msg = "Không Được Để Trống ";    
                validate  = false;       
            }
            try {
                // Kiểm tra xem màu sản phẩm đã tồn tại trong sản phẩm chưa
                const existingSP = await md.spModal.findOne({ name: req.body.name});
                const existingSP1 = await md.spModal.findOne({ image:"http://localhost:3000/uploads/" + req.file.originalname });
              
                if (existingSP || existingSP1) {
                    // Nếu màu sản phẩm đã tồn tại, hiển thị thông báo và không thêm mới
                    msg = "Đã Có Sản Phẩm Này";
                } else {
                    // Nếu màu sản phẩm chưa tồn tại, thêm mới vào cơ sở dữ liệu
                    if(validate){
                        let objSp_2  = {};
                        objSp_2.name = name;
                        objSp_2.image = image;
                        objSp_2.describe = describe;
                        objSp_2.category = loai;
                        objSp_2.price = price;
                      
                        // tìm theo chuỗi id và update 
                        await md.spModal.findByIdAndUpdate(id_sp,objSp_2);
                        msg = ' cập nhật thành công !';
                    } 
                }
            } catch (err) {
                msg = "Lỗi : " + err.message;
            }
            // tạo đối tượng lưu csdl 
        };  
        objSp = await md.spModal.findById(dieukien);
    } catch (error) {
        msg = error.message;
    }
    res.render('sanpham/update',{msg:msg,obj:objSp});

}

exports.spUpTT  =async  (req,res,next) =>{ 
    let objU = req.session.userLogin;
    let msg = "";
    let listmau = null;
    listmau = await Mau.mauModal.find();
    let objMsp = {};
    let id_msp = req.params.id_msp;
    let id_sp = req.params.id_sp;
    let dieukien = {_id:id_msp};
 
    try {
        const sizes = [
            { size: "S", quantity: req.body.sizeS },
            { size: "M", quantity: req.body.sizeM },
            { size: "L", quantity: req.body.sizeL },
            { size: "XL", quantity: req.body.sizeXL }
          ];
        // xử lí sư kiện post 
        if(req.method=='POST'){

            fs.rename(req.file.path, "./public/uploads/" + req.file.originalname,(err)=>{

                if(err){
                    console.log(err);
                }else{
                    console.log("url : http://localhost:3000/uploads/" + req.file.originalname);
                }
            })
            let image = "http://localhost:3000/uploads/" + req.file.originalname;
            let validate = true;

            try {
                // Kiểm tra xem màu sản phẩm đã tồn tại trong sản phẩm chưa
                const existingColor = await mdMauSanPham.mauSPModal.findOne({ productId: id_sp, colorId: req.body.mau });
                const existingSP1 = await mdMauSanPham.mauSPModal.findOne({ image:"http://localhost:3000/uploads/" + req.file.originalname });
              
                if (  existingSP1 || existingColor) {
                    // Nếu màu sản phẩm đã tồn tại, hiển thị thông báo và không thêm mới
                    msg = "Đã Có Thuộc Tính Này";
                } else {
                    // Nếu màu sản phẩm chưa tồn tại, thêm mới vào cơ sở dữ liệu
                    if(validate){
                        let objTT  = {};
                        objTT.colorId  = req.body.mau;
                        objTT.image = "http://localhost:3000/uploads/" + req.file.originalname;
                        objTT.sizes = sizes;
            
                        // tìm theo chuỗi id và update 
                        await mdMauSanPham.mauSPModal.findByIdAndUpdate(id_msp,objTT);
                        msg = ' cập nhật thành công !';
                    } 
                }
            } catch (err) {
                msg = "Lỗi : " + err.message;
            }
            // tạo đối tượng lưu csdl 
        };  
        objMsp = await mdMauSanPham.mauSPModal.findById(dieukien);
    } catch (error) {
        msg = error.message;
    }
  res.render('sanpham/suamau',{listmau:listmau,objU:objU,msg:msg ,objMsp:objMsp})
 }
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




