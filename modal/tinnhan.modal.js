var db = require('./db');
// định nghĩa khuôn mẫu 
var TinNhanSchema = new db.mongoose.Schema(

        {
            sender : { type : String,require:true},
            content : { type : String,require:true},
            date : { type : String,require:true},
            UserId : { type : String,require:true},
            AdminId : { type : String,require:true},
        },
        {
            collection: 'TinNhan'
        }      
);


// tạo modal 
let TinNhanModal = db.mongoose.model("TinNhanModal",TinNhanSchema);
module.exports = {TinNhanModal};