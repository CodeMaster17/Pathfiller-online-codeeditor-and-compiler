import dotenvFlow from 'dotenv-flow';

dotenvFlow.config();

export default {
    // General
    ENV: process.env.ENV,
    PORT: process.env.PORT,
    SERVER_URL: process.env.SERVER_URL,

    // database
    DB_HOST: process.env.DB_HOST
};

