import { Request, Response } from 'express';
import User from '../models/User';
import generateToken from '../utils/generateToken';

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'Usuário já existe' });
    }

    const user = await User.create({
      name,
      email,
      password,
      phone,
    });

    if (user) {
      res.status(201).json({
        success: true,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          phone: user.phone,
        },
        token: generateToken(user._id),
        message: 'Cadastro realizado com sucesso',
      });
    } else {
      res.status(400).json({ success: false, message: 'Dados inválidos' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro no servidor' });
  }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.comparePassword(password))) {
      res.json({
        success: true,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          phone: user.phone,
        },
        token: generateToken(user._id),
        message: 'Login realizado com sucesso',
      });
    } else {
      res.status(401).json({ success: false, message: 'E-mail ou senha incorretos' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro no servidor' });
  }
};

// @desc    Get user profile
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req: any, res: Response) => {
  try {
    const user = await User.findById(req.user._id).select('-password');

    if (user) {
      res.json({
        success: true, user });
    } else {
      res.status(404).json({ success: false, message: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro no servidor' });
  }
};
