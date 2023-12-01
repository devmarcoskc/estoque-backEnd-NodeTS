import mongoose, {Schema, ObjectId} from "mongoose";

type TransactionsHistoryType = {
  orgãoId: ObjectId;
  produtoId: ObjectId;
  tipo: string;
  quantidade: number;
  data: string;
  nome_produto: string;
  categoria_produto: string;
  localização: string;
}

const TransactionsHistorySchema = new Schema<TransactionsHistoryType>({
    orgãoId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    produtoId: { type: Schema.Types.ObjectId, ref: "Products", required: true },
    tipo: { type: String, required: true },
    quantidade: { type: Number, required: true },
    data: { type: String, required: true },
    nome_produto: { type: String, required: true },
    categoria_produto: { type: String, required: true},
    localização: { type: String, required: true },
}, {timestamps: true});

const TransactionsHistory = mongoose.model("Transactions", TransactionsHistorySchema);
export default TransactionsHistory;