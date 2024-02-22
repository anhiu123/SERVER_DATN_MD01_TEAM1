const jwt = require('jsonwebtoken');
require("dotenv").config();
const createJWT = () =>{
    let payload = { name: 'Eric',address :'hanoi' };
    let key =  process.env.JWT_SECRET;
    let token = jwt.sign(payload,key);
    console.log(token);
    return token;
      
}

module.exports = {
    createJWT
}