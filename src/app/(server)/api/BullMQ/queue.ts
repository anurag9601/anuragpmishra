import { ConnectionOptions, DefaultJobOptions } from 'bullmq';


export const redisConnection: ConnectionOptions = {
    host: process.env.NEXT_PUBLIC_REDIS_HOST as string,
    port: Number(process.env.NEXT_PUBLIC_REDIS_PORT) as number,
    username: process.env.NEXT_PUBLIC_REDIS_USERNAME as string,
    password: process.env.NEXT_PUBLIC_REDIS_PASSWORD as string,
    tls: {
        rejectUnauthorized: false
    }
}

export const defaultQueueOptions: DefaultJobOptions = {
    removeOnComplete: {
        count: 20,
        age: 60 * 60
    },
    attempts: 3,
    backoff: {
        type: "exponential",
        delay: 3000,
    },
    removeOnFail: false,
};