import { Request, Response } from "express";
import TransactionsHistory from "../models/TransactionsHistory";

export const getTransactionsHistory = async (req: Request, res:Response) => {
  try {
    const {orgaoId} = req.params;
    const {page = 1} = req.query;

    const transactionsHistory = await TransactionsHistory.find({orgãoId: orgaoId})
    .sort({createdAt:-1})
    .skip((Number(page)- 1) * 100)
    .limit(100);

    res.status(200).json(transactionsHistory);
  } catch (error:any) {
    res.status(500).send({message: `Something went wrong`, errorMsg:error.message});
  }
};