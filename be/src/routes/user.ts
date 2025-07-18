import { Router } from 'express';
import { z } from 'zod';
import jwt from 'jsonwebtoken';
import argon2 from 'argon2';
import { User } from "../db/db";

const userRouter = Router()

const signupSchema = z.object({
    username: z.string().min(4),
    password: z.string().min(6),
    email: z.string().email()
})

// @ts-ignore
userRouter.post('/signup', async (req, res)=>{
    try {
        const body = req.body
        const {success} = signupSchema.safeParse(body)
        if (!success){
            return res.status(400).json({
                message: "Invalid Input"
            })
        }
        const existingUserEmail = await User.findOne({email: body.email})
        if (existingUserEmail){
            return res.status(400).json({
                message: "A user with this email already exists.",
            });
        }

        const existingUsername = await User.findOne({username: body.username})
        if (existingUsername){
            return res.status(400).json({
                message: "A user with this username already exists.",
            });
        }

        const hashedPassword = await argon2.hash(body.password)

        const newUser = await User.create({
            username: body.username,
            password: hashedPassword,
            email: body.email
        })

        const id = newUser._id

        const token = jwt.sign({
            id: id
        }, process.env.JWT_SECRET as string)

        return res.json({
            message: "User created",
            userId: id,
            token
        });

    }catch(e){
        console.error(e)
    }
})

const signinSchema = z.object({
    username: z.string().trim().min(6, "Username or email is required"),
    password: z.string().min(1, "Password is required")
});

// @ts-ignore
userRouter.post('/signin', async (req, res)=>{
    try {
        const body = req.body
        const {success} = signinSchema.safeParse(body)
        if (!success) {
            return res.status(400).json({
                message: "Invalid Inputs"
            })
        }

        const isEmail = z.string().email().safeParse(body.username).success;
        const query = isEmail ? {email: body.username} : {username: body.username}

        const existingUser = await User.findOne(query)
        if (!existingUser) {
            return res.status(404).json({
                message: "User does not exist"
            })
        }

        const verifyPassword = await argon2.verify(existingUser.password, body.password)
        if (!verifyPassword) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign({
            id: existingUser._id
        }, process.env.JWT_SECRET as string)

        return res.json({
            message: 'Login successful',
            userId: existingUser._id,
            token
        });
    }catch(e){
        console.error(e)
    }
})

export default userRouter