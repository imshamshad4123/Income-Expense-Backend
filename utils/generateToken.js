const jwt=require('jsonwebtoken')
require('dotenv').config();
const jwtSecretKey = process.env.JWT_SECRET_KEY;

const generateToken=id=>{
    return jwt.sign({id},jwtSecretKey,{expiresIn:"60m"});
}

module.exports=generateToken;