var db = require('./db');
// định nghĩa khuôn mẫu 
var DiaChiGiaoHangSchema = new db.mongoose.Schema(

        {
            UserId : { type:String, require:true },
            name : { type : String,require:true},
            city : { type : String,require:true},
            street : { type : String,require:true},
            phone : { type : String,require:true},
          
        },
        {
            collection: 'DiaChiGiaoHang'
        }      
);


// tạo modal 
let DCGHModal = db.mongoose.model("DCGHModal",DiaChiGiaoHangSchema);
module.exports = {DCGHModal};