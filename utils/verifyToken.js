const jwt=require("jsonwebtoken")

require('dotenv').config();

const jwtSecretKey = process.env.JWT_SECRET_KEY;
console.log("secret",jwtSecretKey)
const verifyToken=token=>{
    return jwt.verify(token,jwtSecretKey,(err,decoded)=>{
        if (err){
            return false
        }
        else{
            return decoded;
        }
    })
}

module.exports=verifyToken;