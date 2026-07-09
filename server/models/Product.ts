import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  isBestSeller?: boolean;
  available?: boolean;
  stock?: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Por favor, informe o nome do produto'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Por favor, informe a descrição do produto'],
    },
    price: {
      type: Number,
      required: [true, 'Por favor, informe o preço do produto'],
      min: [0, 'O preço não pode ser negativo'],
    },
    originalPrice: {
      type: Number,
      min: [0, 'O preço original não pode ser negativo'],
    },
    category: {
      type: String,
      required: [true, 'Por favor, informe a categoria do produto'],
    },
    image: {
      type: String,
      required: [true, 'Por favor, informe a imagem do produto'],
    },
    isBestSeller: {
      type: Boolean,
      default: false,
    },
    available: {
      type: Boolean,
      default: true,
    },
    stock: {
      type: Number,
      default: 0,
      min: [0, 'O estoque não pode ser negativo'],
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model<IProduct>('Product', ProductSchema);
export default Product;
