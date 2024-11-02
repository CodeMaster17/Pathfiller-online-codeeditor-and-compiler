import mongoose from 'mongoose';
import config from '../config/config';

export default {
    connect: async () => {
        try {
            await mongoose.connect(config.DB_HOST as string);
            return mongoose.connection;
        } catch (err) {
            throw err;
        }
    }
};

