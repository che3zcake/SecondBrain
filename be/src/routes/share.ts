import { Router } from 'express'
import authMiddleware from "../middlewares/authMiddleware";
import { z } from "zod";
import HashIds from 'hashids/cjs'
import {Content, Link, User} from "../db/db";


const shareRouter = Router()
const hashids = new HashIds('lawrence', 6)

// @ts-ignore
shareRouter.get('/share', authMiddleware, async (req, res) =>{
    try {
        // @ts-ignore
        const id = req.userId

        const verifyUser = await Link.findOne({
            userId: id
        })

        if (verifyUser){
            return res.status(200).json({hash: verifyUser.hash})
        }

        const userLink = await Link.create({
            hash: hashids.encodeHex(id.toString()),
            userId: id
        })
        res.json(userLink)

    }catch(e){
        console.error(e);
        res.status(500).json({ error: "Server error" });
    }
})

shareRouter.get('/:shareLink', async (req, res) => {
    const shareLink = req.params.shareLink
    const userLink = await Link.findOne({
        hash: shareLink
    })
    // @ts-ignore
    const userId = userLink.userId
    const user = await User.findById(userId)
    const content = await Content.find({userId: userId})
    res.json({
        // @ts-ignore
        username: user.username,
        content: content
    })
})

export default shareRouter