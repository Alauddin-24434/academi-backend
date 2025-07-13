import Redis from "ioredis";


const redisClient = new Redis({
  host: process.env.REDIS_HOSTNAME || 'localhost',
  port: Number(process.env.REDIS_PORT) || 6379,
  // password: process.env.REDIS_PASSWORD,  
})

export default redisClient;