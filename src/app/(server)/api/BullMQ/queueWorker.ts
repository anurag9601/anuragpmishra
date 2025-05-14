import { Job, Worker } from "bullmq";
import { redisConnection } from "./queue";
import { appQueueName } from "./connectQueue";
import { handleSendQuestionEmail } from "@/services/sendEmail";
import UsersModel from "@/database/users.model";
import MessagesModel from "@/database/messages.model";

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

        if (job.name === "user-auth") {
            const { user } = job.data;

            const existingUser = await UsersModel.findOne({ userEmail: user.email });

            if (!existingUser) {
                await UsersModel.create({
                    userName: user.name,
                    userEmail: user.email,
                    userProfileImage: user.image,
                });
            }

            return true;
        }

        if (job.name === "set-user-message") {
            const { userEmail, message } = job.data;

            let user = await UsersModel.findOne({ userEmail });

            if (!user) {
                return false;
            }

            const newMessage = await MessagesModel.create({
                userData: user._id,
                message
            });

            if (newMessage) {
                user.messages.push(newMessage._id);

                await user.save();
            };

            return true;

        }
    }, { connection: redisConnection });
}

