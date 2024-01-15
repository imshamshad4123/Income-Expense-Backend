const express=require("express")
const usersTransactions=express.Router();
const {createTransactionCtrl,getTransactionCtrl,getAllTransactionCtrl,updateTransactionCtrl,deleteTransactionCtrl}=require("../../controller/transactions/userTransactionCtrl");
const isLogin = require("../../middlewares/isLogin");
//transaction routes
//POST /api/v1/transactions 
usersTransactions.post("/",isLogin,createTransactionCtrl);



//GET /api/v1/transactions 
//getalltransaction
usersTransactions.get("/",getAllTransactionCtrl)


//GET /api/v1/transactions 
usersTransactions.get("/:id",isLogin,getTransactionCtrl)




//PUT /api/v1/transactions 
usersTransactions.put("/:id",isLogin,updateTransactionCtrl)
//POST /api/v1/transactions 
usersTransactions.delete("/:id",isLogin,deleteTransactionCtrl)



module.exports=usersTransactions;