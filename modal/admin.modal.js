var db = require('./db');


var adminSchema = new db.mongoose.Schema(
    {
        username : {type : String ,require:true},
        passwd  : {type : String,require:true},
        email :{ type :String, require:true},
        role : { type : String ,require:true}
    },
    {
        collection :'Admin'
    }
);

let adminModal = db.mongoose.model("adminModal",adminSchema);
module.exports = {adminModal};