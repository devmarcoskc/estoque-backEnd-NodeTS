import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const verifyToken = async (req:Request, res:Response, next: NextFunction) => {
    try {
        let token = req.header("Authorization");
        if(!token) return res.status(403).send("Acess Denied");

        if(token.startsWith("Bearer ")) {
            token = token.slice(7, token.length);
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET as string);

        if(verified) {
            next();
        } else {
            res.status(401).send("Error with token");
        }
    } catch (err: any) {
        res.status(500).json({message: `Something went wrong ${err.message}`})
    }
}