const getTokenFromHeader=req=>{
    
    const headerObj=req.headers;
    const token=headerObj["authorization"].split(" ")[1]
    // const result=verifyToken(token)
    if (token!==undefined){
        return token
    }else{
        return {
            status:"failed",
            message:"There is no token attachedd to the header"
        };
    }


}
module.exports=getTokenFromHeader;