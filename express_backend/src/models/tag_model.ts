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

const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;

