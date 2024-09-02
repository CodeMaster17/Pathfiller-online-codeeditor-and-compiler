const Redis = require('ioredis');

let redisClient;

const getRedisClient = () => {
    if (!redisClient) {
        if (!process.env.REDIS_URL) {
            throw new Error('REDIS_URL environment variable is not set');
        }

        redisClient = new Redis(process.env.REDIS_URL, {
            maxRetriesPerRequest: null,
            enableReadyCheck: false,
            reconnectOnError: (err) => {
                console.error('Redis error:', err);
                return true;
            },
            retryStrategy: (times) => {
                // const delay = Math.min(times * 50, 2000);
                // return delay;
            }
        });

        redisClient.on('connect', () => console.log('Redis client connected'));
        redisClient.on('ready', () => console.log('Redis client ready'));
        redisClient.on('error', (err) => console.error('Redis client error:', err));
        redisClient.on('end', () => console.log('Redis client disconnected'));
    }
    return redisClient;
};

module.exports = getRedisClient;
