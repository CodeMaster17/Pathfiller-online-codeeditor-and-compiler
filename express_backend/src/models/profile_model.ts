import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
    gender: {
        type: String
    },
    date_of_birth: {
        type: String
    },
    about: {
        type: String,
        trim: true
    },
    contact_number: {
        type: Number,
        trim: true
    }
});
export default mongoose.model('Profile', profileSchema);

