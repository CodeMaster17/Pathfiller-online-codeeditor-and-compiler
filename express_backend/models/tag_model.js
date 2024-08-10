const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the schema for a tag
const tagSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true // Ensures tag names are unique
    },
    description: {
        type: String
    }
}, {
    timestamps: true // Adds createdAt and updatedAt fields
});

// Create and export the Tag model
const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;
