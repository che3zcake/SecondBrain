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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const link_preview_js_1 = require("link-preview-js");
const metaRouter = (0, express_1.Router)();
// @ts-ignore
metaRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { url } = req.query;
    if (!url)
        return res.status(400).json({ error: 'Missing URL' });
    try {
        const data = yield (0, link_preview_js_1.getLinkPreview)(url);
        res.json(data);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to fetch preview' });
    }
}));
exports.default = metaRouter;
