var db = require('./db');


var tkSchema = new db.mongoose.Schema(
    {
        username : {type : String ,require:true},
        passwd  : {type : String,require:true},
        email :{ type :String, require:true},
        image : { type : String,require:true},
        address : { type : String ,require:true},
        numberPhone : { type : Number ,require:true}
    },
    {
        collection :'NguoiDung'
    }
);

let tkModal = db.mongoose.model("tkModal",tkSchema);
module.exports = {tkModal};