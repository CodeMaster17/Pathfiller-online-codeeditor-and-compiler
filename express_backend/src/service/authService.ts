import mongoose from 'mongoose';
import config from '../config/config';
import user_model from '../models/user_model';
import { IUser } from '../types/userTypes';

export default {
    connect: async () => {
        try {
            await mongoose.connect(config.DB_HOST as string);
            return mongoose.connection;
        } catch (err) {
            throw err;
        }
    },
    findUserByEmailAddress: (emailAddress: string, select: string = '') => {
        return user_model
            .findOne({
                emailAddress
            })
            .select(select);
    },
    registerUser: (payload: IUser) => {
        return user_model.create(payload);
    }
};

