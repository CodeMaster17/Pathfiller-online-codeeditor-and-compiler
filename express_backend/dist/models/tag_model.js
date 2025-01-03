"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const tagSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: false
    },
    description: {
        type: String
    }
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model('Tag', tagSchema);
//# sourceMappingURL=tag_model.js.map