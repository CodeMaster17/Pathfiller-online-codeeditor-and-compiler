"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    first_name: {
        type: String,
        required: true,
        trim: true
    },
    last_name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    account_type: {
        type: String,
        enum: ['Admin', 'Member', 'User'],
        required: true
    },
    is_active: {
        type: Boolean,
        default: true
    },
    is_approved: {
        type: Boolean,
        default: true
    },
    additional_details: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: 'Profile'
    },
    token: {
        type: String
    },
    reset_password_expires: {
        type: Date
    },
    image: {
        type: String
    }
}, { timestamps: true });
exports.default = mongoose_1.default.model('user', userSchema);
//# sourceMappingURL=user.js.map