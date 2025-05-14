import { Queue } from "bullmq";
import { defaultQueueOptions, redisConnection } from "./queue";

export const appQueueName = "appQueue";

export function connectQueue() {
    const appQueue = new Queue(appQueueName, {
        connection: redisConnection,
        defaultJobOptions: defaultQueueOptions
    });

    return appQueue;
}