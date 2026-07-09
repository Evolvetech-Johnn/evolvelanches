import { Request, Response } from 'express';
import Order from '../models/Order';

export const getOrders = async (req: any, res: Response) => {
  try {
    let query = {};
    if (req.user && req.user.role !== 'admin') {
      query = { userId: req.user._id };
    }
    const orders = await Order.find(query).sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro no servidor' });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.json({ success: true, order });
    } else {
      res.status(404).json({ success: false, message: 'Pedido não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro no servidor' });
  }
};

export const createOrder = async (req: any, res: Response) => {
  try {
    const orderData = req.body;
    if (req.user) {
      orderData.userId = req.user._id;
    }
    const order = new Order(orderData);
    const savedOrder = await order.save();
    res.status(201).json({ success: true, order: savedOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro no servidor' });
  }
};

export const updateOrderStatus = async (req: any, res: Response) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    if (order) {
      res.json({ success: true, order });
    } else {
      res.status(404).json({ success: false, message: 'Pedido não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro no servidor' });
  }
};

export const deleteOrder = async (req: any, res: Response) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (order) {
      res.json({ success: true, message: 'Pedido removido com sucesso' });
    } else {
      res.status(404).json({ success: false, message: 'Pedido não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro no servidor' });
  }
};
