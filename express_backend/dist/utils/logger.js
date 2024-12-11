"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const util_1 = __importDefault(require("util"));
const winston_1 = require("winston");
const config_1 = __importDefault(require("../config/config"));
const application_1 = require("../constants/application");
require("winston-mongodb");
const sourceMapSupport = __importStar(require("source-map-support"));
sourceMapSupport.install();
const consoleLogFormat = winston_1.format.printf((info) => {
    const { level, message, timestamp, meta = {} } = info;
    const customLevel = level.toUpperCase();
    const customTimestamp = timestamp;
    const customMessage = message;
    const customMeta = util_1.default.inspect(meta, {
        showHidden: false,
        depth: null
    });
    const customLog = `${customLevel} [${customTimestamp}] ${customMessage}\n${'META'} ${customMeta}\n`;
    return customLog;
});
const consoleTransport = () => {
    if (config_1.default.ENV === application_1.EApplicationEnviroment.DEVELOPMENT) {
        return [
            new winston_1.transports.Console({
                level: 'info',
                format: winston_1.format.combine(winston_1.format.timestamp(), consoleLogFormat)
            })
        ];
    }
    return [];
};
const FileLogFormat = winston_1.format.printf((info) => {
    const { level, message, timestamp, meta = {} } = info;
    const logMeta = {};
    for (const [key, value] of Object.entries(meta)) {
        if (value instanceof Error) {
            logMeta[key] = {
                name: value.name,
                message: value.message,
                trace: value.stack || ''
            };
        }
        else {
            logMeta[key] = value;
        }
    }
    const logData = {
        level: level.toUpperCase(),
        message,
        timestamp,
        meta: logMeta
    };
    return JSON.stringify(logData, null, 4);
});
const FileTransport = () => {
    return [
        new winston_1.transports.File({
            filename: path_1.default.join(__dirname, '../', '../', 'logs', `${config_1.default.ENV}.log`),
            level: 'info',
            format: winston_1.format.combine(winston_1.format.timestamp(), FileLogFormat)
        })
    ];
};
const MongoDBTransport = () => {
    return [
        new winston_1.transports.MongoDB({
            level: 'info',
            db: config_1.default.DB_HOST,
            options: { useUnifiedTopology: true },
            collection: 'application-logs',
            metaKey: 'meta',
            expireAfterSeconds: 60 * 60 * 24 * 30
        })
    ];
};
exports.default = (0, winston_1.createLogger)({
    defaultMeta: {
        meta: {}
    },
    transports: [...consoleTransport(), ...FileTransport(), ...MongoDBTransport()]
});
//# sourceMappingURL=logger.js.map