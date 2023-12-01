import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from './routes/auth'
import userRoutes from './routes/users';
import productsRoutes from './routes/products';
import transactionsHistoryRoutes from './routes/transactionsHistory';

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

const PORT = process.env.PORT || 6001;

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/products', productsRoutes);
app.use('/transactions', transactionsHistoryRoutes);

mongoose.connect(process.env.MONGO_URL as string).then(() => {
    app.listen(PORT, () => console.log(`Rodando na porta: ${PORT}`));
}).catch((error) => console.log(error));