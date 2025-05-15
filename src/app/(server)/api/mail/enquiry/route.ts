import { NextRequest } from "next/server";
import { connectQueueAndWorker } from "../../BullMQ/connectBullMQAndWorker";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();

        const userData: Record<string, string> = {};
        const files: {
            name: string;
            type: string;
            content: Buffer;
        }[] = [];

        for (const [key, value] of formData.entries()) {
            if (key.startsWith("file-") && value instanceof File) {
                if (value.type !== "application/pdf") {
                    return Response.json({ error: `File "${value.name}" is not a PDF.` }, { status: 400 });
                }

                if (value.size > 10 * 1024 * 1024) {
                    return Response.json({ error: `File "${value.name}" exceeds 10MB limit.` }, { status: 400 });
                }

                const arrayBuffer = await value.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);

                files.push({
                    name: value.name,
                    type: value.type,
                    content: buffer,
                });
            } else {
                userData[key] = value.toString();
            }
        }

        const appQueue = connectQueueAndWorker();

        await appQueue.add("send-project-enquiry", {
            userData,
            files
        });

        return Response.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error("Error parsing form:", error);
        return Response.json({ error: "Internal server error" }, { status: 500 });
    }
}
