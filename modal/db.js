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

mongoose.connect("mongodb+srv://k53ka10e:k457GUmMnZgsoVzo@datn.6hbuotf.mongodb.net/DATN?retryWrites=true&w=majority&appName=DATN", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Error connecting to MongoDB:', error));


    module.exports = {mongoose};