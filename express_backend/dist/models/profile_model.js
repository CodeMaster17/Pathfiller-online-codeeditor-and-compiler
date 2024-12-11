"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const profileSchema = new mongoose_1.default.Schema({
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
exports.default = mongoose_1.default.model('Profile', profileSchema);
//# sourceMappingURL=profile_model.js.map