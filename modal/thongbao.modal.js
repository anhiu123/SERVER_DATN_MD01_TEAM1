var db = require('./db');
// định nghĩa khuôn mẫu 
var ThongBaoSchema = new db.mongoose.Schema(

        {
            UserId : { type:String, require:true },
            status : { type : String,require:true},
            date : { type : String,require:true},
        },
        {
            collection: 'ThongBao'
        }      
);


// tạo modal 
let ThongBaoModal = db.mongoose.model("ThongBaoModal",ThongBaoSchema);
module.exports = {ThongBaoModal};