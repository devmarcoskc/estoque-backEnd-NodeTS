import mongoose, {Schema, ObjectId} from "mongoose";

export type ProductType = {
    orgãoId: ObjectId;
    nome: string;
    código_de_identificação: string;
    categoria: string;
    localização: string;
    status: string;
    data_validade: string;
    quantidade: number;
    fornecedor: string;
    data_entrada: string;
    preço_compra: number;
    preço_venda: number;
};

const ProductSchema = new Schema<ProductType>({
    orgãoId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    nome: { type: String, required: true, minlength: 2 },
    código_de_identificação: { type: String, required: true, minlength: 2 },
    categoria: { type: String, required: true, minlength: 2 },
    localização: { type: String, required: true },
    status: { type: String, required: true },
    data_validade: { type: String, required: true },
    quantidade: { type: Number, required: true },
    fornecedor: { type: String, required: true, minlength: 2 },
    data_entrada: { type: String, required: true },
    preço_compra: { type: Number, required: true },
    preço_venda: { type: Number, required: true }
}, {timestamps: true});

const Product = mongoose.model("Products", ProductSchema);
export default Product;