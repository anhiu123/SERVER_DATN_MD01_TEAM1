var db = require('./db');


var SPDSchema = new db.mongoose.Schema(
    {
        DonHangId :{ type :String, require:true},
        SanPhamId :{ type :String, require:true},
    },
    {
        collection :'SanPhamTrongDon'
    }
);

let SPHModal = db.mongoose.model("SPHModal",SPDSchema);
module.exports = {SPHModal};