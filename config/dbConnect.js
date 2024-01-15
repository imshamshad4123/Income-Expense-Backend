const mongoose=require("mongoose")

require('dotenv').config();
const mongo_uri = process.env.MONGO_URI;
const dbConnect=async ()=>{
    // const connectionParams={
    //     useNewUrlParser:true,
    //     useUnifiedTopology:true,
    // }
    try {
        await mongoose.connect(mongo_uri)
        console.log("Database connected by async await ")
    }catch (error) {
        console.error(error);
        console.log('Database connection failed');
    }
};


dbConnect();