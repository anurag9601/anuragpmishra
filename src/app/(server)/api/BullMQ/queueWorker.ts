import { Job, Worker } from "bullmq";
import { redisConnection } from "./queue";
import { appQueueName } from "./connectQueue";
import { handleSendQuestionEmail } from "@/services/sendEmail";

//Worker
export function connectQueueWorker() {
    new Worker(appQueueName, async (job: Job) => {

        if (job.name === "send-user-question") {
            const { data } = job;

            const messageId = await handleSendQuestionEmail(
                data.userName,
                data.email,
                data.questionCategory,
                data.urgencyLevel,
                data.preferredResponseTime,
                data.yourQuestion);

            if (messageId) {
                return true;
            }

            return false;
        }
    }, { connection: redisConnection });
}

