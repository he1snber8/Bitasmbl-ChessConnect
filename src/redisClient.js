// src/redisClient.js
import { createClient } from "redis";
import dotenv from "dotenv";
dotenv.config();

const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";

const redisClient = createClient({ url: redisUrl });
const pubClient = createClient({ url: redisUrl });
const subClient = createClient({ url: redisUrl });

redisClient.on("error", (err) => console.error("Redis Client Error:", err));
pubClient.on("error", (err) => console.error("Redis Pub Error:", err));
subClient.on("error", (err) => console.error("Redis Sub Error:", err));

await redisClient.connect();
await pubClient.connect();
await subClient.connect();

export { redisClient, pubClient, subClient };
