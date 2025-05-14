import mongoose from "mongoose";

interface isConnectedDataType {
    isConnected?: number
}

const dbConnected: isConnectedDataType = {};

export default async function connectMongoDB() {
    if (dbConnected.isConnected) {
        console.log("Mongoose is already connected");
        return;
    }

    try {
        const db = await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URL as string);

        dbConnected.isConnected = db.connections[0].readyState;

        console.log("mongodb connected successfully");
    } catch (error) {
        console.log("Error while connect mongodb", error);
        process.exit(1);
    }
}