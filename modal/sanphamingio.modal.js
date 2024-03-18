var db = require('./db');


var SPGSchema = new db.mongoose.Schema(
    {
        CartId :{ type :String, require:true},
        ProductId :{ type :String, require:true},
        ColorCode :{ type :String, require:true},
        Name :{ type :String, require:true},
        Price :{ type :Number, require:true},
        Size :{ type :String, require:true},
        Quantity :{ type :Number, require:true},
        PropertiesId: { type :String, require:true},
        Image: { type :String, require:true},

        // SoLuong    SanPhamId
    },
    {
        collection :'SanPhamTrongGio'
    }
);

let SPGModal = db.mongoose.model("SPGModal",SPGSchema);
module.exports = {SPGModal};