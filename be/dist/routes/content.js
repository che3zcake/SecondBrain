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
const zod_1 = require("zod");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const db_1 = require("../db/db");
const contentRouter = (0, express_1.Router)();
const contentSchema = zod_1.z.object({
    type: zod_1.z.enum(['document', 'tweet', 'youtube', 'link']).optional().default('document'),
    link: zod_1.z.string().trim().optional(),
    image: zod_1.z.string().trim().optional(),
    title: zod_1.z.string().min(3).trim(),
    description: zod_1.z.string().max(500).trim().optional(),
    tag: zod_1.z.array(zod_1.z.string().trim()).optional().default(['note'])
});
// @ts-ignore
contentRouter.post('/create', authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const { success } = contentSchema.safeParse(body);
        if (!success) {
            return res.status(403).json({
                message: "Invalid inputs"
            });
        }
        // const parsed = contentSchema.parse(body);
        const tagArray = [];
        for (const t of body.tag) {
            let tag = yield db_1.Tag.findOne({ title: t });
            if (!tag) {
                tag = yield db_1.Tag.create({
                    title: t
                });
            }
            tagArray.push(tag._id);
        }
        const contentData = {
            title: body.title,
            type: body.type,
            image: body.image,
            description: body.description,
            tag: tagArray,
            date: new Date(),
            // @ts-ignore
            userId: req.userId
        };
        if (body.link) {
            contentData.link = body.link;
        }
        const newContent = yield db_1.Content.create(contentData);
        res.json({
            message: "Content Created",
            contentId: newContent._id
        });
    }
    catch (e) {
        console.error(e);
        // @ts-ignore
        res.status(500).json({ id: req.userId });
    }
}));
// @ts-ignore
contentRouter.get('/', authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contentArray = yield db_1.Content.find({
            // @ts-ignore
            userId: req.userId
        }).populate('tag');
        if (!contentArray || contentArray.length === 0) {
            return res.status(404).json({
                message: "No content found for this user."
            });
        }
        res.status(200).json({
            contentArray
        });
    }
    catch (e) {
        console.error(e);
        res.status(500).json({
            message: "An error occurred while fetching content.",
            // @ts-ignore
            error: e.message
        });
    }
}));
// @ts-ignore
contentRouter.delete("/:contentId", authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contentId = req.params.contentId;
        const verifyContent = yield db_1.Content.findById(contentId);
        if (!verifyContent) {
            return res.status(404).json({
                message: "Content does not exist"
            });
        }
        // @ts-ignore
        if (verifyContent.userId.toString() === req.userId) {
            yield db_1.Content.deleteOne({ _id: contentId });
            return res.json({ message: "Content deleted successfully" });
        }
        else {
            return res.status(403).json({
                message: "User doesn't have authority to delete this content"
            });
        }
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ message: "Internal server error" });
    }
}));
exports.default = contentRouter;
