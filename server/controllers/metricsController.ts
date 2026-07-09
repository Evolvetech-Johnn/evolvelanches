import { Request, Response } from 'express';
import Order from '../models/Order';
import Product from '../models/Product';
import User from '../models/User';

export const getMetrics = async (req: any, res: Response) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const lastWeek = new Date(today);
    lastWeek.setDate(lastWeek.getDate() - 7);

    const totalOrders = await Order.countDocuments();
    const todayOrders = await Order.countDocuments({
      createdAt: { $gte: today, $lt: tomorrow }
    });
    const weekOrders = await Order.countDocuments({
      createdAt: { $gte: lastWeek, $lt: tomorrow }
    });

    const allOrders = await Order.find();
    const totalRevenue = allOrders.reduce((sum, order) => sum + order.subtotal, 0);
    const todayRevenue = allOrders
      .filter(order => order.createdAt >= today && order.createdAt < tomorrow)
      .reduce((sum, order) => sum + order.subtotal, 0);
    const weekRevenue = allOrders
      .filter(order => order.createdAt >= lastWeek && order.createdAt < tomorrow)
      .reduce((sum, order) => sum + order.subtotal, 0);

    const totalCustomers = await User.countDocuments({ role: 'client' });
    const newCustomers = await User.countDocuments({
      role: 'client',
      createdAt: { $gte: lastWeek, $lt: tomorrow }
    });

    const productSales = {};
    allOrders.forEach(order => {
      order.items.forEach(item => {
        const productId = item.productId.toString();
        if (!productSales[productId]) {
          productSales[productId] = {
            ...item,
            quantity: 0,
            total: 0
          };
        }
        productSales[productId].quantity += item.quantity;
        productSales[productId].total += item.quantity * item.price;
      });
    });

    const topProducts = Object.values(productSales)
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 10);

    res.json({
      success: true,
      metrics: {
        totalOrders,
        todayOrders,
        weekOrders,
        totalRevenue,
        todayRevenue,
        weekRevenue,
        totalCustomers,
        newCustomers,
        topProducts
      }
    });
  } catch (error) {
    console.error('Error getting metrics:', error);
    res.status(500).json({ success: false, message: 'Error getting metrics' });
  }
};

export const exportOrders = async (req: any, res: Response) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    
    const csvHeader = 'ID Pedido,Nome Cliente,Telefone,Total,Status,Data\n';
    const csvContent = orders.map(order => {
      const date = order.createdAt.toLocaleDateString('pt-BR');
      return `"${order._id}","${order.customerName}","${order.customerPhone}","${order.subtotal.toFixed(2)}","${order.status}","${date}"`;
    }).join('\n');
    
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=pedidos.csv');
    res.send(csvHeader + csvContent);
  } catch (error) {
    console.error('Error exporting orders:', error);
    res.status(500).json({ success: false, message: 'Error exporting orders' });
  }
};

export const exportCustomers = async (req: any, res: Response) => {
  try {
    const users = await User.find({ role: 'client' });
    const orders = await Order.find();
    
    const customerStats = {};
    orders.forEach(order => {
      if (order.userId) {
        const userId = order.userId.toString();
        if (!customerStats[userId]) {
          customerStats[userId] = { count: 0, total: 0 };
        }
        customerStats[userId].count++;
        customerStats[userId].total += order.subtotal;
      }
    });
    
    const csvHeader = 'ID,Nome,Email,Telefone,Total Pedidos,Total Gasto,Data Cadastro\n';
    const csvContent = users.map(user => {
      const stats = customerStats[user._id.toString()] || { count: 0, total: 0 };
      const date = user.createdAt.toLocaleDateString('pt-BR');
      return `"${user._id}","${user.name}","${user.email}","${user.phone || ''}","${stats.count}","${stats.total.toFixed(2)}","${date}"`;
    }).join('\n');
    
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=clientes.csv');
    res.send(csvHeader + csvContent);
  } catch (error) {
    console.error('Error exporting customers:', error);
    res.status(500).json({ success: false, message: 'Error exporting customers' });
  }
};
