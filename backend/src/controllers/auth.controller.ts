import { Request, Response } from 'express';
import User from '../models/User.model';
import { generateToken } from '../utils/token.utils';

// User signup
export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
   
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
   
    // Create new user
    const user = new User({
      name,
      email,
      password,
      // Default role is 'user', set automatically in model
    });
    await user.save();
   
    // Generate token
    const token = generateToken(user._id.toString(), user.role);
   
    // Return token in response instead of setting cookie
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// User login
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
   
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
   
    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
   
    // Generate token
    const token = generateToken(user._id.toString(), user.role);
   
    // Return token in response instead of setting cookie
    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// User logout - With token-based auth, logout is typically handled client-side
export const logout = async (req: Request, res: Response) => {
  try {
    // No server-side action needed for token-based auth
    // Client should discard the token
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get current user
export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
   
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
   
    res.status(200).json({ user });
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};