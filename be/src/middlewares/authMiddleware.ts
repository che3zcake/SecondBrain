import jwt, {JwtPayload} from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const authMiddleware = (req:Request,res:Response,next:NextFunction) => {
    const authHeader =req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(403).json({'error':'Unauthorized'})
    }

    const token = authHeader.split(' ')[1]

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET as string)as JwtPayload & { id: string }
        // @ts-ignore
        req.userId = decoded.id;
        next()
    }catch(e){
        return res.status(403).json({
            message:"Not logged in"
        })
    }
}

export default authMiddleware;