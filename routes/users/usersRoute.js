const express=require("express");
const { userRegisterCtrl, userLoginCtrl,updateUser,getUser,deleteUser } = require("../../controller/users/userRoutectrl");
const isLogin = require("../../middlewares/isLogin");

const usersRoute=express.Router();


//POST api/v1/users/register register user


usersRoute.post("/register",userRegisterCtrl)



//POST api/v1/users/login
usersRoute.post("/login",userLoginCtrl);


//GET api/v1/users/profile/getuser/
usersRoute.get("/profile/",isLogin,getUser);



//PUT api/v1/users/:id
usersRoute.put("/",isLogin,updateUser);

//DELETE api/v1/getuser/:id
usersRoute.delete("/",isLogin,deleteUser);





module.exports=usersRoute;