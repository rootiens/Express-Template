import { Request, Response } from "express";
import User from "../models/user";
import bcrypt from "bcrypt";
// import { ValidationError } from "sequelize";

export const create = async (req: Request, res: Response) => {
  bcrypt.hash(req.body.password, 10, async (err, hash) => {
    try {
      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hash,
      });
      res.json({
        success: true,
        data: {
          name: user.name,
          email: user.email,
        },
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message
      })
      // switch (true) {
      //   case err instanceof ValidationError:
      //     return res.status(500).json({
      //       success: false,
      //       message: err.message,
      //     });
      //   default:
      //     return res.status(500).json({
      //       success: false,
      //       message: err.message,
      //     });
      // }
    }
  });
};
