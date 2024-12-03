import Redis from 'ioredis';

let redisClient: Redis | undefined;

const getRedisClient = (): Redis => {
    if (!redisClient) {
        // Uncomment and set the REDIS_URL if using environment variables
        // if (!process.env.REDIS_URL) {
        //     throw new Error('REDIS_URL environment variable is not set');
        // }

        const redisUrl = 'redis://127.0.0.1:6379';

        redisClient = new Redis(redisUrl, {
            maxRetriesPerRequest: null,
            enableReadyCheck: false,
            reconnectOnError: (err) => {
                console.error('Redis error:', err);
                return true; // Always reconnect on error
            },
            retryStrategy: () => {
                // Uncomment and customize if needed
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

export default getRedisClient;

