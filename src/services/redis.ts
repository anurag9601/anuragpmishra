import Redis from "ioredis";

const redis = new Redis(process.env.NEXT_PUBLIC_REDIS_SERVICE_URL as string);

export default redis;