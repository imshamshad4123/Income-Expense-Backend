const express=require("express")
const accountRoute=express.Router();


const {createAccountCtrl,
    getAllUserAccountCtrl,
    getUserAccountCtrl,
    updateAccountCtrl,
    deleteAccountCtrl,
    getSingleUserAllAccountCtrl}=require("../../controller/accounts/userAccountctrl");

const isLogin = require("../../middlewares/isLogin");
// account route 





//POST api/v1/account/
accountRoute.post("/",isLogin,createAccountCtrl)


//GET /api/v1/account
//get all account

accountRoute.get("/",getAllUserAccountCtrl)



//GET api/v1/account/:id

accountRoute.get("/:id",getUserAccountCtrl)



//GET api/v1/account/user/:id
// accountRoute.get("/user/:id",isLogin,getSingleUserAllAccountCtrl)
accountRoute.get("/user/id",isLogin,getSingleUserAllAccountCtrl)


//POST api/v1/account/:id
accountRoute.put("/:id",isLogin,updateAccountCtrl)


//delete api/v1/account/:id

accountRoute.delete("/:id",isLogin,deleteAccountCtrl)


module.exports=accountRoute;