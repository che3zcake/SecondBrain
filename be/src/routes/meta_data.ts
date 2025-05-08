import {Router} from 'express'
import {getLinkPreview} from "link-preview-js";

const metaRouter = Router()

// @ts-ignore
metaRouter.get('/', async (req, res) => {
    const { url } = req.query;

    if (!url) return res.status(400).json({ error: 'Missing URL' });

    try {
        const data = await getLinkPreview(url as string);
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch preview' });
    }
});

export default metaRouter
