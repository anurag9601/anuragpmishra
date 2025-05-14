import { Job, Worker } from "bullmq";
import { redisConnection } from "./queue";
import { appQueueName } from "./connectQueue";

//Worker
export function connectQueueWorker() {
    new Worker(appQueueName, async (job: Job) => {
        const data = job.data;

        console.log("The queue data is", data);
    }, { connection: redisConnection });
}

