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
exports.Tag = exports.Content = exports.Link = exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect("mongodb+srv://che3zcake:spider30114@cluster0.ab8kv.mongodb.net/");
        console.log("Database connected successfully");
    }
    catch (e) {
        console.error("Database connection error:", e);
    }
}))();
const userSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        trim: true,
        minlength: 6
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        unique: true
    }
});
const contentSchema = new mongoose_1.default.Schema({
    type: {
        type: String,
        required: [true, 'Please specify types'],
        trim: true,
        enum: ['document', 'tweet', 'youtube', 'note']
    },
    link: {
        type: String,
        required: false,
        trim: true
    },
    image: {
        type: String,
        default: null
    },
    title: {
        type: String,
        required: [true, 'Please add a title']
    },
    description: {
        type: String,
        trim: true
    },
    tag: {
        type: [mongoose_1.default.Schema.Types.ObjectId],
        required: [true, 'Add tags'],
        ref: 'Tag'
    },
    date: {
        type: Date,
        required: true,
    },
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        trim: true,
        validate: function (value) {
            return __awaiter(this, void 0, void 0, function* () {
                const user = yield User.findById(value);
                if (!user) {
                    throw new Error('User does not exist');
                }
            });
        }
    }
});
const tagSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        unique: true
    }
});
const linkSchema = new mongoose_1.default.Schema({
    hash: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    sharable: {
        type: Boolean,
        required: true,
        default: false
    },
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        trim: true
    }
});
const User = mongoose_1.default.model('User', userSchema);
exports.User = User;
const Link = mongoose_1.default.model('Link', linkSchema);
exports.Link = Link;
const Content = mongoose_1.default.model('Content', contentSchema);
exports.Content = Content;
const Tag = mongoose_1.default.model('Tag', tagSchema);
exports.Tag = Tag;
