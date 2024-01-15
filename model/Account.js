const mongoose=require("mongoose")


const accountSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    accountType:{
        type:String,
        enum:["Savings","Investment","Checking","Credit Card","Billing","School","Project","Utilities","Travel",
    "Personal","Groceries","Entertainment","Loan","Cashflow","Uncategorised","Education",],
        required:true,
    },
    initialBalance:{
        type:Number,
        required:true,
        default:0,
    },
    hasCreatedAccount:{
        type:Boolean,
        default:false,
    },
    transactions: [
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Transaction",
    }],
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    notes:{
        type:String,
        required:true,

    }
},{
    timestamps:true,
    toJSON:{virtuals:true},
}
);

//model

const Account=mongoose.model("Account",accountSchema)

module.exports=Account;