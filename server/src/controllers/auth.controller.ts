import bcrypt from 'bcryptjs';
import { Request, Response } from "express";
import jwt, { VerifyErrors } from 'jsonwebtoken';
import userModel from '../models/user.model';

export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (user) return res.status(400).json({ message: 'email is in use' });

    const passwordHashed = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      username,
      email,
      password: passwordHashed,
    });

    const createUser = await newUser.save();

    const secretKey = process.env.SECRET_KEY;
    if (!secretKey) return res.status(500).json({ message: "Internal server error" });

    const token = jwt.sign({ id: newUser._id, username, email }, secretKey);

    res.cookie('roomToken', token);
    res.json({
      id: createUser._id,
      username: createUser.username,
      email: createUser.email,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    };
  };
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log({ email, password });

  try {
    const user = await userModel.findOne({ email });
    if (!user) return res.status(400).json({ message: 'user not exist' });

    if (typeof user.password === 'string') {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: "Incorrect password" });

      const secretKey = process.env.SECRET_KEY;
      if (!secretKey) return res.status(500).json({ message: "Internal server error" });

      const token = jwt.sign({ id: user.id, username: user.username, email }, secretKey);
      res.cookie('roomToken', token);
      res.json({
        id: user._id,
        username: user.username,
        email: user.email
      });
    };
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    };
  };
};

export const verifyToken = async (req: Request, res: Response) => {
  const { roomToken } = req.cookies;

  if (!roomToken) return res.status(401).json({ message: 'Unauthorized' });

  if (!process.env.SECRET_KEY) return res.status(500).json({ message: 'internal Server Error' });

  jwt.verify(roomToken, process.env.SECRET_KEY, async (err: VerifyErrors | null, user: any) => {
    if (err) return res.status(401).json({ message: 'Unauthorized' });

    const userFound = await userModel.findById(user.id);
    if (!userFound) return res.status(401).json({
      message: 'Unauthorized'
    });

    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email
    });
  });
};