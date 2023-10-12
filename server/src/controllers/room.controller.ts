import { Request, Response } from "express";
import roomModel from "../models/room.model";

export const getRoom = async (req:Request, res: Response) => {
  try {
    const rooms = await roomModel.find();
    res.send(rooms);
  } catch (error) {
    console.log(error);
  }
}