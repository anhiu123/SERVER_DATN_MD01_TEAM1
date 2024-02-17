var db = require('./db');
// định nghĩa khuôn mẫu 
var DGSchema = new db.mongoose.Schema(

        {
            UserId : { type:String, require:true },
            SanPhamId : { type : String,require:true},
            date : { type : String,require:true},
            noidung : { type : String,require:true},
            sao : { type : String,require:true},
          
        },
        {
            collection: 'DanhGia'
        }      
);


// tạo modal 
let DGModal = db.mongoose.model("DGModal",DGSchema);
module.exports = {DGModal};