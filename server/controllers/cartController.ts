import { Request, Response } from 'express';
import Cart from '../models/Cart';

export const getCart = async (req: any, res: Response) => {
  try {
    let cart;
    if (req.user) {
      cart = await Cart.findOne({ userId: req.user._id });
    }
    if (!cart) {
      res.json({ success: true, cart: { items: [] } });
      return;
    }
    res.json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro no servidor' });
  }
};

export const updateCart = async (req: any, res: Response) => {
  try {
    const { items } = req.body;
    let cart;
    if (req.user) {
      cart = await Cart.findOne({ userId: req.user._id });
      if (cart) {
        cart.items = items;
        await cart.save();
      } else {
        cart = await Cart.create({ userId: req.user._id, items });
      }
    } else {
      // For guest users, we'll just send success but won't persist (or we could use sessions)
      res.json({ success: true, cart: { items } });
      return;
    }
    res.json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro no servidor' });
  }
};

export const clearCart = async (req: any, res: Response) => {
  try {
    if (req.user) {
      await Cart.findOneAndDelete({ userId: req.user._id });
    }
    res.json({ success: true, message: 'Carrinho esvaziado com sucesso' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro no servidor' });
  }
};
