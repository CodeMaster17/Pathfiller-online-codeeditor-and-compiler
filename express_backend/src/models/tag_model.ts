import mongoose from 'mongoose';
const { Schema } = mongoose;

const tagSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: false
        },
        description: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model('Tag', tagSchema);

