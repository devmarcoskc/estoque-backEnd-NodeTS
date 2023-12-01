import User from "../models/User";
import { Request, Response } from "express";

export const getUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id);

        res.status(200).json(user);
    } catch(error: any) {
        res.status(500).send({message: 'Something went wrong', errorMsg: `${error.message}`})
    }
}; 