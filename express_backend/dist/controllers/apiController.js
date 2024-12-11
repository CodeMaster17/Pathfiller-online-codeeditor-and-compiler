"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpResponse_1 = __importDefault(require("../utils/httpResponse"));
const responseMessage_1 = require("../constants/responseMessage");
const httpError_1 = __importDefault(require("../utils/httpError"));
exports.default = {
    self: (req, res, next) => {
        try {
            (0, httpResponse_1.default)(req, res, 200, responseMessage_1.responseMessage.SUCCESS);
        }
        catch (err) {
            (0, httpError_1.default)(next, err, req, 500);
        }
    }
};
//# sourceMappingURL=apiController.js.map