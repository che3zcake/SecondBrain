import { Router } from 'express'
import { z } from 'zod'
import authMiddleware from "../middlewares/authMiddleware";
import {User, Content, Tag} from "../db/db";

const contentRouter = Router()

const contentSchema = z.object({
    type: z.enum(['document', 'tweet', 'youtube', 'link']).optional().default('document'),
    link: z.string().trim().optional(),
    image: z.string().trim().optional(),
    title: z.string().min(3).trim(),
    description:z.string().max(500).trim().optional(),
    tag: z.array(z.string().trim()).optional().default(['note'])
})

// @ts-ignore
contentRouter.post('/create', authMiddleware, async (req, res) => {
    try{
        const body = req.body
        const { success } = contentSchema.safeParse(body)
        if (!success){
            return res.status(403).json({
                message: "Invalid inputs"
            })
        }

        // const parsed = contentSchema.parse(body);

        const tagArray = [];
        for (const t of body.tag) {
            let tag = await Tag.findOne({title: t});
            if (!tag) {
                tag = await Tag.create({
                    title: t
                })
            }
            tagArray.push(tag._id)
        }

        const contentData: any = {
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

        const newContent = await Content.create(contentData);

        res.json({
            message: "Content Created",
            contentId: newContent._id
        })

    }catch(e){
        console.error(e)
        // @ts-ignore
        res.status(500).json({ id: req.userId })
    }
})

// @ts-ignore
contentRouter.get('/', authMiddleware, async (req, res) => {
    try{
        const contentArray = await Content.find({
            // @ts-ignore
            userId: req.userId
        }).populate('tag')

        if (!contentArray || contentArray.length === 0) {
            return res.status(404).json({
                message: "No content found for this user."
            });
        }

        res.status(200).json({
            contentArray
        });

    }catch(e){
        console.error(e)
        res.status(500).json({
            message: "An error occurred while fetching content.",
            // @ts-ignore
            error: e.message
        });
    }
})

// @ts-ignore
contentRouter.delete("/:contentId", authMiddleware, async (req, res) => {
     try {
         const contentId = req.params.contentId
         const verifyContent = await Content.findById(contentId)
         if (!verifyContent) {
             return res.status(404).json({
                 message: "Content does not exist"
             })
         }
         // @ts-ignore
         if (verifyContent.userId.toString() === req.userId) {
             await Content.deleteOne({_id: contentId})
             return res.json({message: "Content deleted successfully"});
         } else {
             return res.status(403).json({
                 message: "User doesn't have authority to delete this content"
             });
         }
     }catch(e){
         console.error(e);
         res.status(500).json({ message: "Internal server error" });
     }
})

export default contentRouter