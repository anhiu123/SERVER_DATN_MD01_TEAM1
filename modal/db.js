const mongoose = require("mongoose");
// mongoose.connect('mongodb://127.0.0.1:27017/DATN').catch((err)=>{
    
//     console.log(err);
// } );

// const connectDB = async () =>{
//     try {
//         await mongoose.connect(process.env.MONGOODB_CONNECT_URI)
//         console.log("Connect SuccessFully");
//     } catch (error) {
//         console.log("connect Faild");
//     }
// }

require("dotenv").config();
mongoose
  .connect(process.env.MONGOODB_CONNECT_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("connected to DB."))
  .catch((err) => console.log(err));

    module.exports = {mongoose};