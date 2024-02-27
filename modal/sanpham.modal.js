var db = require('./db');
const mongoose = require('mongoose');
// định nghĩa khuôn mẫu 
var spSchema = new db.mongoose.Schema(

        {
         
            name : { type:String, require:true },
             image : { type : String,require:true},
             describe : {type : String,require:true},
            price : {type : Number,require:true},
            category : {type : String,require:true},
            quantitySold : {type : Number,require:true},
            timeCreate : {type : String,require:true},
            //  loai
        },
        {
            collection: 'SanPham'
        }      
);


// tạo modal 
let spModal = db.mongoose.model("spModal",spSchema);
module.exports = {spModal};
