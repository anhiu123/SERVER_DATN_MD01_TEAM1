var db = require('./db');


var SPDSchema = new db.mongoose.Schema(
    {
        OrderId :{ type :String, require:true},
        ProductId :{ type :String, require:true},
        ColorCode :{ type :String, require:true},
        Size :{ type :String, require:true},
        Quantity :{ type :Number, require:true},
        PropertiesId: { type :String, require:true},
        Image: { type :String, require:true},

        // DonHangId     SanPhamId    SoLuong   IdThuocTinh
    },
    {
        collection :'SanPhamTrongDon'
    }
);

let SPHModal = db.mongoose.model("SPHModal",SPDSchema);
module.exports = {SPHModal};