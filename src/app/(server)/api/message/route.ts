import connectMongoDB from "@/database/connectMongoDB";
import { NextRequest } from "next/server";
import { connectQueueAndWorker } from "../BullMQ/connectBullMQAndWorker";
import redis from "@/services/redis";

export async function POST(req: NextRequest) {
    try {
        const { userEmail, message } = await req.json();

        await connectMongoDB();

        const appQueue = connectQueueAndWorker();

        const setMessage = await appQueue.add("set-user-message", { userEmail, message });

        if (!setMessage) {
            console.log("Error in /api/message route while setting the message into the db");
            return Response.json({ error: "Internal server error" }, { status: 500 });
        }

        await redis.del("all-messages")

        return Response.json({ success: true }, { status: 200 })
    } catch (error) {
        console.log("Error in /api/message route", error);
        return Response.json({ error: "Internal server error" }, { status: 500 })
    }
}