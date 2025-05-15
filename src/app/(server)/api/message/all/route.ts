import MessagesModel from "@/database/messages.model";
import redis from "@/services/redis";
import { connectQueueAndWorker } from "../../BullMQ/connectBullMQAndWorker";
import connectMongoDB from "@/database/connectMongoDB";

export async function GET() {
    try {
        await connectMongoDB();
        const appQueue = connectQueueAndWorker();

        await appQueue.add("give-all-messages", { process: true });

        let allMessages = await redis.get("all-messages");

        if (!allMessages) {
            const freshMessages = (await MessagesModel.find({}).sort({ createdAt: -1 }).populate("userData"))
            redis.set("all-messages", JSON.stringify(freshMessages)); // cache it
            allMessages = JSON.stringify(freshMessages);
        }

        return Response.json({ success: true, allMessages: JSON.parse(allMessages) }, { status: 200 });
    } catch (error) {
        console.log("Error in /api/message/all route", error);
        return Response.json({ error: "Internal server error" }, { status: 500 });
    }
}
