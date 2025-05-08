"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(403).json({ 'error': 'Unauthorized' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, 'lawrence');
        // @ts-ignore
        req.userId = decoded.id;
        next();
    }
    catch (e) {
        return res.status(403).json({
            message: "Not logged in"
        });
    }
};
exports.default = authMiddleware;
