const mongoose=require("mongoose")


const dbConnect=async ()=>{
    // const connectionParams={
    //     useNewUrlParser:true,
    //     useUnifiedTopology:true,
    // }
    try {
        await mongoose.connect(`mongodb+srv://imshamshad598:shamshad123@cluster0.pzovjal.mongodb.net/income-expense`)
        console.log("Database connected by async await ")
    }catch (error) {
        console.error(error);
        console.log('Database connection failed');
    }
};


dbConnect();