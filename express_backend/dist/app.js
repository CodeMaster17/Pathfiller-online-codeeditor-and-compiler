"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const codeRouter_1 = __importDefault(require("./router/codeRouter"));
const playgroundRouter_1 = __importDefault(require("./router/playgroundRouter"));
const problemRouter_1 = __importDefault(require("./router/problemRouter"));
const responseMessage_1 = require("./constants/responseMessage");
const httpError_1 = __importDefault(require("./utils/httpError"));
const globalErrorHandler_1 = __importDefault(require("./middleware/globalErrorHandler"));
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, '../', 'public')));
app.use('/api/v1/code', codeRouter_1.default);
app.use('/api/v1/playground', playgroundRouter_1.default);
app.use('/api/v1/problem', problemRouter_1.default);
app.use((req, _, next) => {
    try {
        throw new Error(responseMessage_1.responseMessage.NOT_FOUND('route'));
    }
    catch (error) {
        (0, httpError_1.default)(next, error, req, 404);
    }
});
app.use(globalErrorHandler_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map