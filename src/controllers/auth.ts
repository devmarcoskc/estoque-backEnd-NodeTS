import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { Request, Response } from 'express';

export const register = async (req: Request, res: Response) => {
    try {
        const { orgao, cidade, estado, email, password } = req.body;
        console.log(orgao, cidade, estado, email, password);

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            orgao,
            cidade,
            estado,
            email,
            password: passwordHash
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch(err: any) {
      res.status(400).send({error:`Something went wrong: ${err.message}`})
    }
}

export const login = async (req: Request, res:Response) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email: email});
        if(!user) return res.status(401).json({message: "Usuário não existe!"});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(401).json({message: "Senha inválida"});

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET as string);

        res.status(200).json({token, user});
    } catch (err:any) {
        res.status(500).send({error:`Something went wrong: ${err.message}`})
    }
}