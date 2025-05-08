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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const argon2_1 = __importDefault(require("argon2"));
const db_1 = require("../db/db");
const userRouter = (0, express_1.Router)();
const signupSchema = zod_1.z.object({
    username: zod_1.z.string().min(4),
    password: zod_1.z.string().min(6),
    email: zod_1.z.string().email()
});
// @ts-ignore
userRouter.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const { success } = signupSchema.safeParse(body);
        if (!success) {
            return res.status(400).json({
                message: "Invalid Input"
            });
        }
        const existingUserEmail = yield db_1.User.findOne({ email: body.email });
        if (existingUserEmail) {
            return res.status(400).json({
                message: "A user with this email already exists.",
            });
        }
        const existingUsername = yield db_1.User.findOne({ username: body.username });
        if (existingUsername) {
            return res.status(400).json({
                message: "A user with this username already exists.",
            });
        }
        const hashedPassword = yield argon2_1.default.hash(body.password);
        const newUser = yield db_1.User.create({
            username: body.username,
            password: hashedPassword,
            email: body.email
        });
        const id = newUser._id;
        const token = jsonwebtoken_1.default.sign({
            id: id
        }, "lawrence");
        return res.json({
            message: "User created",
            userId: id,
            token
        });
    }
    catch (e) {
        console.error(e);
    }
}));
const signinSchema = zod_1.z.object({
    username: zod_1.z.string().trim().min(6, "Username or email is required"),
    password: zod_1.z.string().min(1, "Password is required")
});
// @ts-ignore
userRouter.post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const { success } = signinSchema.safeParse(body);
        if (!success) {
            return res.status(400).json({
                message: "Invalid Inputs"
            });
        }
        const isEmail = zod_1.z.string().email().safeParse(body.username).success;
        const query = isEmail ? { email: body.username } : { username: body.username };
        const existingUser = yield db_1.User.findOne(query);
        if (!existingUser) {
            return res.status(404).json({
                message: "User does not exist"
            });
        }
        const verifyPassword = yield argon2_1.default.verify(existingUser.password, body.password);
        if (!verifyPassword) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }
        const token = jsonwebtoken_1.default.sign({
            id: existingUser._id
        }, "lawrence");
        return res.json({
            message: 'Login successful',
            userId: existingUser._id,
            token
        });
    }
    catch (e) {
        console.error(e);
    }
}));
exports.default = userRouter;
