"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = __importDefault(require("ioredis"));
let redisClient;
const getRedisClient = () => {
    if (!redisClient) {
        const redisUrl = 'redis://127.0.0.1:6379';
        redisClient = new ioredis_1.default(redisUrl, {
            maxRetriesPerRequest: null,
            enableReadyCheck: false,
            reconnectOnError: (err) => {
                console.error('Redis error:', err);
                return true;
            },
            retryStrategy: () => {
            }
        });
        redisClient.on('connect', () => console.log('Redis client connected'));
        redisClient.on('ready', () => console.log('Redis client ready'));
        redisClient.on('error', (err) => console.error('Redis client error:', err));
        redisClient.on('end', () => console.log('Redis client disconnected'));
    }
    return redisClient;
};
exports.default = getRedisClient;
//# sourceMappingURL=get_redis_client.js.map