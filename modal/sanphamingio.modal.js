var db = require('./db');


var SPGSchema = new db.mongoose.Schema(
    {
        CartId :{ type :String, require:true},
        SanPhamId :{ type :String, require:true},
        ColorCode :{ type :String, require:true},
        Size :{ type :String, require:true},
        SoLuong :{ type :Number, require:true},
    },
    {
        collection :'SanPhamTrongGio'
    }
);

let SPGModal = db.mongoose.model("SPGModal",SPGSchema);
module.exports = {SPGModal};