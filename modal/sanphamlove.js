var db = require('./db');
// định nghĩa khuôn mẫu 
var SPloveSchema = new db.mongoose.Schema(

        {
            UserId : { type:String, require:true },
            ProductId :{ type :String, require:true},
        },
        {
            collection: 'SanPhamYeuThich'
        }      
);


// tạo modal 
let SploveModal = db.mongoose.model("SploveModal",SPloveSchema);
module.exports = {SploveModal};