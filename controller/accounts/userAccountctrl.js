const Account = require("../../model/Account");
const User = require("../../model/User");
const { AppErr } = require("../../utils/appError");

const { ObjectId } = require('mongodb');

//POST api/v1/account/ 
//createaccount controller
const createAccountCtrl=async(req,res,next)=>{
    const {name,initialBalance,accountType,notes}=req.body
    
    try {
        //find the logged in user
        const userFound =await User.findById(req.user)
        if(!userFound) return next(new AppErr('user not found',404))
        //create the account
        const account=await Account.create({
            name,
            initialBalance,
            accountType,
            notes,
            createdBy:req.user,
        });
        //push the created account into users accounts
        // userFound.accounts.push(account._id)
        userFound.accounts.push(account)

        //resave the user 
        await userFound.save();

        res.json({
            status:"success",
            data:account,
        })
    } catch (error) {
        next(new AppErr(error.message,500))
    }
    
};

//GET /api/v1/account
//get all usaer  account

const getAllUserAccountCtrl=async(req,res,next)=>{
    try {
        console.log(req.user)

        const accounts=await Account.find().populate('transactions')
        res.json({
            status:"success",
            data:accounts,
        })  
        return accounts
    } catch (error) {
        next(new AppErr(error.message,500))
    }
};



//GET api/v1/account/:id
//get single user account controller

const getUserAccountCtrl=async(req,res,next)=>{

    try {

        const {id}=req.params  // finding the id of account from url
        const account=await Account.findById(id).populate('transactions') 

        res.json({
            status:"success",
            data:account,
        })  
    } catch (error) {
        // next(error)
        next(new AppErr(error.message,500))
    }
};

//get single user all account 
//GET api/v1/account/user/:id

const getSingleUserAllAccountCtrl=async(req,res,next)=>{
    console.log("beforetry")
    try {
        console.log("==================================")
        console.log("userid",req.user)
        const id=req.user
        // const { id } = req.params;
        console.log("id",id)
        const userId = new ObjectId(id);
      
        // Optimized MongoDB query to directly filter accounts
        const userAccounts = await Account.find({ createdBy: userId }).populate('transactions');
      
        res.json({
          status: "success",
          data: userAccounts,
        });
        console.log("uera",userAccounts)
      } catch (error) {
        next(new AppErr(error.message, 500));
      }
};

//POST api/v1/account/:id
//update useraccount controller


const updateAccountCtrl=async(req,res,next)=>{
    try {
        const {id}=req.params
        const account=await Account.findByIdAndUpdate(id,req.body,{
            new:true,runValidators:true
        })
        // console.log(req.user)
        res.json({
            status:"success",
            data:account
        })
    } catch (error) {
        next(new AppErr(error.message,500))
    }
    
};


//delete api/v1/account/:id
//delete account controler
const deleteAccountCtrl=async(req,res,next)=>{
    try {
        const {id}=req.params

        await Account.findByIdAndDelete(id)
        res.status(200).json({
            status:"success",
            data:null,
        })
    } catch (error) {
        next(new AppErr(error.message,500))
    }
    
};

module.exports={
    createAccountCtrl,
    getAllUserAccountCtrl,
    getUserAccountCtrl,
    updateAccountCtrl,
    deleteAccountCtrl,
    getSingleUserAllAccountCtrl,
}