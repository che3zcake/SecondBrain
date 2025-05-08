"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const cjs_1 = __importDefault(require("hashids/cjs"));
const db_1 = require("../db/db");
const shareRouter = (0, express_1.Router)();
const hashids = new cjs_1.default('lawrence', 6);
// @ts-ignore
shareRouter.get('/share', authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // @ts-ignore
        const id = req.userId;
        const verifyUser = yield db_1.Link.findOne({
            userId: id
        });
        if (verifyUser) {
            return res.status(200).json({ hash: verifyUser.hash });
        }
        const userLink = yield db_1.Link.create({
            hash: hashids.encodeHex(id.toString()),
            userId: id
        });
        res.json(userLink);
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ error: "Server error" });
    }
}));
shareRouter.get('/:shareLink', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const shareLink = req.params.shareLink;
    const userLink = yield db_1.Link.findOne({
        hash: shareLink
    });
    // @ts-ignore
    const userId = userLink.userId;
    const user = yield db_1.User.findById(userId);
    const content = yield db_1.Content.find({ userId: userId });
    res.json({
        // @ts-ignore
        username: user.username,
        content: content
    });
}));
exports.default = shareRouter;
