var db = require('./db');
// định nghĩa khuôn mẫu 
var mauSchema = new db.mongoose.Schema(

        {
            name : { type:String, require:true },
            colorcode : { type : String,require:true},
        },
        {
            collection: 'MauSac'
        }      
);


// tạo modal 
let mauModal = db.mongoose.model("mauModal",mauSchema);
module.exports = {mauModal};