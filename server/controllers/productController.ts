import { Request, Response } from 'express';
import Product from '../models/Product';

// @desc    Get all products
// @route   GET /api/products
// @access  Public
export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find({ available: true });
    res.json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro no servidor' });
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json({ success: true, product });
    } else {
      res.status(404).json({ success: false, message: 'Produto não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro no servidor' });
  }
};

// @desc    Create product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req: any, res: Response) => {
  try {
    const product = new Product(req.body);
    const createdProduct = await product.save();
    res.status(201).json({ success: true, product: createdProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro no servidor' });
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (req: any, res: Response) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (product) {
      res.json({ success: true, product });
    } else {
      res.status(404).json({ success: false, message: 'Produto não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro no servidor' });
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = async (req: any, res: Response) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (product) {
      res.json({ success: true, message: 'Produto removido com sucesso' });
    } else {
      res.status(404).json({ success: false, message: 'Produto não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro no servidor' });
  }
};
