import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user";

export const login = async (req: Request, res: Response) => {
  const user = await User.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (user) {
    await bcrypt.compare(req.body.password, user?.password, (err, result) => {
      if (result == true) {
        const token = jwt.sign(
          { email: user.email },
          `${process.env.JSON_KEY}`,
          { expiresIn: `${process.env.JWT_EXPIRE_DAYS}d` }
        );
        res.json({
          status: "success",
          token: `Bearer ${token}`,
          expires_at: new Date(
            Date.now() +
              parseInt(`${process.env.JWT_EXPIRE_DAYS}*24*60*60*1000`)
          ),
        });
      } else {
        res.status(500).json({
          status: "failed",
          message: "incorrect email/password",
        });
      }
    });
  } else {
    res.status(500).json({
      status: "failed",
      message: "incorrect email/password",
    });
  }
};
