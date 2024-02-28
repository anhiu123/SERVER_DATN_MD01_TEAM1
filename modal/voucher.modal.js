var db = require('./db');
// định nghĩa khuôn mẫu 
var VoucherSchema = new db.mongoose.Schema(

        {
            name : { type : String,require:true},
            content : { type : String,require:true},
            image : { type : String,require:true},
            price : { type : Number,require:true},
            fromDate : { type : String,require:true},
            toDate : { type : String,require:true},
            create_time : { type : String,require:true}
        },
        {
            collection: 'Voucher'
        }      
);


// tạo modal 
let VoucherModal = db.mongoose.model("VoucherModal",VoucherSchema);
module.exports = {VoucherModal};