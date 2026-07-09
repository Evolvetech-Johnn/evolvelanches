import { Request, Response } from 'express';
import User from '../models/User';
import Order from '../models/Order';

export const getUsers = async (req: any, res: Response) => {
  try {
    const users = await User.find({ role: 'client' }).sort({ createdAt: -1 });
    const usersWithStats = await Promise.all(users.map(async user => {
      const orders = await Order.find({ userId: user._id });
      const totalSpent = orders.reduce((sum, order) => sum + order.subtotal, 0);
      const averageTicket = orders.length > 0 ? totalSpent / orders.length : 0;
      return {
        ...user.toJSON(),
        ordersCount: orders.length,
        totalSpent,
        averageTicket,
        lastOrder: orders.length > 0 ? orders[0].createdAt : null
      };
    }));
    res.json({ success: true, users: usersWithStats });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro no servidor' });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'Usuário não encontrado' });
    }
    const orders = await Order.find({ userId: user._id }).sort({ createdAt: -1 });
    const totalSpent = orders.reduce((sum, order) => sum + order.subtotal, 0);
    const averageTicket = orders.length > 0 ? totalSpent / orders.length : 0;
    res.json({ 
      success: true, 
      user: {
        ...user.toJSON(),
        orders,
        ordersCount: orders.length,
        totalSpent,
        averageTicket
      } 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro no servidor' });
  }
};
