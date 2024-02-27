var db = require('./db');


var SPGSchema = new db.mongoose.Schema(
    {
        CartId :{ type :String, require:true},
        ProductId :{ type :String, require:true},
        ColorCode :{ type :String, require:true},
        Size :{ type :String, require:true},
        Quantity :{ type :Number, require:true},

        // SoLuong    SanPhamId
    },
    {
        collection :'SanPhamTrongGio'
    }
);

let SPGModal = db.mongoose.model("SPGModal",SPGSchema);
module.exports = {SPGModal};