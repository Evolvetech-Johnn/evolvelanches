import mongoose, { Document, Schema } from 'mongoose';

interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface IOrder extends Document {
  userId?: string;
  customerName?: string;
  customerPhone?: string;
  customerAddress?: string;
  items: OrderItem[];
  subtotal: number;
  status: string;
  paymentMethod?: string;
  observation?: string;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema: Schema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  customerName: {
    type: String,
    required: true
  },
  customerPhone: {
    type: String,
    required: true
  },
  customerAddress: {
    type: String
  },
  items: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    image: {
      type: String,
      required: true
    }
  }],
  subtotal: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Recebido', 'Em preparo', 'Saiu para entrega', 'Entregue', 'Retirado', 'Cancelado'],
    default: 'Recebido'
  },
  paymentMethod: {
    type: String
  },
  observation: {
    type: String
  }
}, {
  timestamps: true
});

const Order = mongoose.model<IOrder>('Order', OrderSchema);
export default Order;
