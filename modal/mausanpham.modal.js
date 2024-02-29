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
                type : String,require:true
              },
              image : { type : String,require:true},
              sizes: [
                {
                    size: { type: String, required: true },
                    quantity: { type: Number, default: 0 }
                }
            ]
        },
        {
            collection: 'MauSanPham'
        }      
);


// tạo modal 
let mauSPModal = db.mongoose.model("mauSPModal",mauSPSchema);
module.exports = {mauSPModal};