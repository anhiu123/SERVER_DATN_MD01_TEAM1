var db = require('./db');
// định nghĩa khuôn mẫu 
var DonHangSchema = new db.mongoose.Schema(

        {
            UserId : { type:String, require:true },
            status : { type : String,require:true},
            date : { type : String,require:true},
          
        },
        {
            collection: 'DonHang'
        }      
);


// tạo modal 
let DonHangModal = db.mongoose.model("DonHangModal",DonHangSchema);
module.exports = {DonHangModal};