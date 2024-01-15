const { AppErr } = require("../utils/appError")
const getTokenFromHeader = require("../utils/getTokenFromHeader")
const verifyToken = require("../utils/verifyToken")



const isLogin=(req,res,next)=>{
    //get token from the request header
    const token=getTokenFromHeader(req)
    //verify
    const decodeUser=verifyToken(token)
    // save the user into req obj
    req.user=decodeUser.id
    if (!decodeUser){
        return next(new AppErr("Invalid/Expired Token,Please login again",401))
    }
    next()
}

module.exports=isLogin;