"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = __importDefault(require("./user"));
const content_1 = __importDefault(require("./content"));
const share_1 = __importDefault(require("./share"));
const meta_data_1 = __importDefault(require("./meta_data"));
const routes = (0, express_1.Router)();
routes.use('/user', user_1.default);
routes.use('/content', content_1.default);
routes.use('/brain', share_1.default);
routes.use('/meta', meta_data_1.default);
exports.default = routes;
