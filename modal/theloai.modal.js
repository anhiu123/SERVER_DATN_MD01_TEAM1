var db = require('./db');
// định nghĩa khuôn mẫu 
var tlSchema = new db.mongoose.Schema(

        {  image : { type : String,require:true},
            name : { type:String, require:true },
         
        },
        {
            collection: 'TheLoai'
        }      
);


// tạo modal 
let tlModal = db.mongoose.model("tlModal",tlSchema);
module.exports = {tlModal};