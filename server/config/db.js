import mongoose from "mongoose";

export const connectDB=async()=>{
    const URL= process.env.MONGO_URI
    try {
        await mongoose.connect(URL,{});
        console.log('connected to mongodb')
    } catch (error) {
        console.log('error while connecting with database',error.message);
    }
}

export default connectDB;