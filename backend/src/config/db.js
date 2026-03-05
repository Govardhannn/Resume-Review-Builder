import mongoose from "mongoose";

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI,{
            dbName: "Resume-Project"
        });
        console.log("MongoDB Connected");
    } catch (error) {
        console.log("MongoDB Connection Failed:", error.message);
    }
};

export default dbConnection;
