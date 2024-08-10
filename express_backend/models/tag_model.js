const mongoose = require('mongoose');
const { Schema } = mongoose;


const tagSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    }
}, {
    timestamps: true
});


const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;
