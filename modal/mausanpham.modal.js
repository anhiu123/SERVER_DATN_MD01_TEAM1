var db = require('./db');
const mongoose = require('mongoose');

// định nghĩa khuôn mẫu 
var mauSPSchema = new db.mongoose.Schema(

        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'SanPham',
              },
              colorId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'MauSac',
              },
              image : { type : String,require:true},
        },
        {
            collection: 'MauSanPham'
        }      
);


// tạo modal 
let mauSPModal = db.mongoose.model("mauSPModal",mauSPSchema);
module.exports = {mauSPModal};