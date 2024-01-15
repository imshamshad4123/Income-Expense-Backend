console.log ("hello")
const express=require("express")
require("./config/dbConnect")
const cors=require("cors")
const app=express();
const usersRoute=require('./routes/users/usersRoute.js')
const accountRoute=require("./routes/accounts/usersAccount.js")

const usersTransactions=require("./routes/transactions/usersTransaction.js");
const globalErrHandler = require("./middlewares/globalErrHandlers");

//middlewares\

app.use(cors())

const corsOptions = {
  origin: ['https://thunderclient.io', 'https://notesappbackend3-fn9c.onrender.com',"http://localhost:3000"],
};
app.use(cors(corsOptions));

app.use(express.json())   //pass incoming data



//routes
//users route 
//POST api/v1/profile/register register user

app.use("/api/v1/users",usersRoute)


//account routes
app.use("/api/v1/account",accountRoute)


//Transactions Routes
app.use("/api/v1/transactions/",usersTransactions)


//error handlers

app.use(globalErrHandler)

//listen to server
const PORT=process.env.PORT||5001
app.listen(PORT,()=>{
    console.log(`The server is listening on port ${PORT}`)
})


