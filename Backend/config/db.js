import mongoose from "mongoose";
import dns from 'dns'

const connectDB = async () => {
    try {

        dns.setServers([
            "1.1.1.1",
            "8.8.8.8"
        ]);
        await mongoose.connect(`${process.env.MONGODB_URI}/mern-auth`); 
        console.log("MongoDB Connected") 
    } catch (error) {
        console.log(error)
        // process.exit()
    }
}

export default connectDB;