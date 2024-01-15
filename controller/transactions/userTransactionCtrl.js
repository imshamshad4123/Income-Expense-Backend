const Account = require("../../model/Account");
const Transaction = require("../../model/Transaction");
const User = require("../../model/User");

const { AppErr } = require("../../utils/appError");



//POST api/v1/account/ 
//createaccount controller
const createTransactionCtrl=async(req,res,next)=>{

    const {name,amount,notes,transactionType,account,category }=req.body

    try {
        //find the user
        const userFound=await User.findById(req.user)   
        console.log("==",userFound)
        if (!userFound){
             return next(new AppErr('user not found ',404))
        }
        //find the account
        const accountFound=await Account.findById(account)
        if (!accountFound){
            return next(new AppErr('account not found ',404))
       }
       console.log("acc",accountFound)
        //create the transaction

        const transaction=await Transaction.create({
            amount,notes,account,transactionType,category,name,
            createdBy:req.user
        })

        console.log("tra",transaction)
        //push the transaction  to account
        accountFound.transactions.push(transaction._id)
        //resasve the account
        await accountFound.save()
        res.json({
            status:"success",
            data:transaction,
        })
    } catch (error) {
        next(new AppErr(error.message,500))
    }
    
};



//GET /api/v1/account
//get all usaer  account

const getAllTransactionCtrl=async(req,res,next)=>{

    try {
        const transaction=await Transaction.find()

        res.json({
            status:"success",
            data:transaction
        })
    } catch (error) {
        next(new AppErr(error.message,500))
    }
};


//GET api/v1/account/:id
//get single user transaction controller

const getTransactionCtrl=async(req,res,next)=>{
    try {
        const {id}=req.params
        const transaction=await Transaction.findById(id)
        res.json({
           status:"success",
           data:transaction
        })
    } catch (error) {
        next(new AppErr(error.message,500))
    }
};

//POST api/v1/account/:id
//update useraccount controller


const updateTransactionCtrl=async(req,res,next)=>{

    try {
        const {id}=req.params
        const transaction=await Transaction.findByIdAndUpdate(id,req.body,{
            new:true,
            runValidators:true,
        })
        res.json({
            status:"success",
            data:transaction

        })
    } catch (error) {
        next(new AppErr(error.message,500))
    }
    
};


//delete api/v1/account/:id
//delete account controler
const deleteTransactionCtrl=async(req,res,next)=>{
    try {
        const {id}=req.params
        await Transaction.findByIdAndDelete(id)
        res.status(200).json({
           status:"success",
           data:null
        })
    } catch (error) {
        next(new AppErr(error.message,500))
    }
    
};

module.exports={
    createTransactionCtrl,
    getTransactionCtrl,
    getAllTransactionCtrl,
    updateTransactionCtrl,
    deleteTransactionCtrl,
}