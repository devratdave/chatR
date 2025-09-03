import mongoose from 'mongoose';


const connectDb = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`connected to MongoDB at ${conn.connection.host}:${conn.connection.port}`);
    }catch(error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1); // Exit the process with failure
    }
}

export default connectDb;