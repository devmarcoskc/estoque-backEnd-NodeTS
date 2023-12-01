import Product from "../models/Product";
import { Request, Response } from "express";
import User from "../models/User";
import TransactionsHistory from "../models/TransactionsHistory";

export const createProduct = async (req: Request, res: Response) => {
    try {
        const { 
            orgãoId, 
            nome, 
            código_de_identificação, 
            categoria,
            localização,
            status,
            data_validade,
            quantidade, 
            fornecedor, 
            data_entrada, 
            preço_compra, 
            preço_venda
        } = req.body;

        const userExists = await User.findById(orgãoId);
        if(!userExists) return res.status(404).json({ message: "User not found with the provided orgaoId" });

        const newProduct = await Product.create({
            orgãoId, nome, código_de_identificação, 
            categoria,localização, status,quantidade, 
            fornecedor, data_validade, data_entrada, 
            preço_compra, preço_venda
        });

        const newTransactionHistory = await TransactionsHistory.create({
            orgãoId: orgãoId, produtoId: newProduct._id, tipo: 'entrada ao estoque',
            quantidade, data: data_entrada, nome_produto: nome,
            categoria_produto: categoria, localização
        });

        const savedTransactionHistory = await newTransactionHistory.save();
        const savedProduct = await newProduct.save();
        res.status(201).json({savedProduct, savedTransactionHistory});
    } catch(error:any) {
        res.status(500).send({message: `Something went wrong`, ErrorMsg: `${error.message}`})
    }
};

export const getProducts = async (req: Request, res: Response) => {
    try {
        const {orgaoId} = req.params;
        const { page = 1} = req.query;

        const products = await Product.find({orgãoId: orgaoId})
        .sort({createdAt:-1})
        .skip((Number(page)- 1) * 100)
        .limit(100);

        res.status(200).json(products);
    } catch(error: any) {
        res.status(500).send({message: `Something went wrong`, ErrorMsg: `${error.message}`})
    }
};

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const { 
            orgãoId, 
            nome, 
            código_de_identificação, 
            categoria,
            localização,
            status,
            data_validade,
            quantidade, 
            quantidade_modificada,
            fornecedor, 
            data_entrada, 
            preço_compra, 
            preço_venda,
            tipo,
        } = req.body;

        const getCurrentDate = () => {
          const currentDate = new Date();
          const day = String(currentDate.getDate()).padStart(2, '0');
          const month = String(currentDate.getMonth() +1 ).padStart(2, '0');
          const year = currentDate.getFullYear();
          return `${day}/${month}/${year}`;
        }

        const product = await Product.findById(id);
        if(!product) return res.status(404).send({message: 'No Product with this id has found'});

        let newTransactionHistory: any | undefined;
        if(tipo) {
          newTransactionHistory = await TransactionsHistory.create({
            orgãoId, produtoId: id, nome_produto: nome,
            tipo, quantidade: quantidade_modificada, data: getCurrentDate(), 
            categoria_produto: categoria, localização
          });
        }

        product.nome = nome;
        product.orgãoId = orgãoId;
        product.código_de_identificação = código_de_identificação;
        product.categoria = categoria,
        product.localização = localização,
        product.status = status,
        product.data_validade = data_validade,
        product.quantidade = quantidade;
        product.fornecedor = fornecedor;
        product.data_entrada = data_entrada;
        product.preço_compra = preço_compra;
        product.preço_venda = preço_venda;

        if(newTransactionHistory) {
          await newTransactionHistory.save();
        }
        await product.save();

        const productsUpdated = await Product.find({orgãoId}).sort({createdAt:-1}).limit(100);
        res.status(200).send(productsUpdated);
    } catch (error: any) {
        res.status(500).send({message: `Something went wrong`, ErrorMsg: `${error.message}`})
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const {id, orgaoId} = req.params;

        const getCurrentDate = () => {
            const currentDate = new Date();
            const day = String(currentDate.getDate()).padStart(2, '0');
            const month = String(currentDate.getMonth() +1 ).padStart(2, '0');
            const year = currentDate.getFullYear();
            return `${day}/${month}/${year}`;
          }

        const ProductToDelete = await Product.findById(id);
        if(!ProductToDelete) res.status(404).send({message: "Nenhum produto encontrado"});  

        const NewTransaction = await TransactionsHistory.create({
          orgãoId: orgaoId, produtoId: id, nome_produto: ProductToDelete?.nome,
          tipo:'Remoção do estoque', quantidade: ProductToDelete?.quantidade, data: getCurrentDate(), 
          categoria_produto: ProductToDelete?.categoria, localização: ProductToDelete?.localização
        });

        await Product.findByIdAndDelete(id);
        await NewTransaction.save();
        const products = await Product.find({orgãoId: orgaoId}).sort({createdAt:-1}).limit(100);

        res.status(200).json(products);
    } catch(error: any) {
        res.status(404).send({message: 'Something went wrong', errorMsg: `${error.message}`})
    }
};