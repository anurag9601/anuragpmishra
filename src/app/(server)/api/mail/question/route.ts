import { NextRequest } from "next/server";
import { connectQueueAndWorker } from "../../BullMQ/connectBullMQAndWorker";

export async function POST(req: NextRequest) {
    try {
        const appQueue = connectQueueAndWorker();

        const { userName,
            email,
            questionCategory,
            urgencyLevel,
            preferredResponseTime,
            yourQuestion } = await req.json();

        appQueue.add("send-user-question", {
            userName,
            email,
            questionCategory,
            urgencyLevel,
            preferredResponseTime,
            yourQuestion
        })

        return Response.json({ success: true }, { status: 200 });
    } catch (error) {
        console.log("Error in api/mail/question", error)
        return Response.json({ error: "Internal server error" }, { status: 500 });
    }
}