import { connectQueue } from "./connectQueue";
import { connectQueueWorker } from "./queueWorker";

export function connectQueueAndWorker() {
    const appQueue = connectQueue();
    connectQueueWorker();
    return appQueue;
}