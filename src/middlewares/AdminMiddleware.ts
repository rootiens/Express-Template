import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import User from "../models/user";

export const protect = async (req: Request, res: Response, next: any) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    res.status(401).json({
      status: "failed",
      message: "token required",
    });
    return;
  }
  jwt.verify(
    `${token}`,
    `${process.env.JSON_KEY}`,
    (err: any, decoded: any) => {
      if (err) {
        res.status(401).json({
          status: "failed",
          message: err,
        });
        return;
      }
      User.findOne({
        where: {
          email: decoded.email,
        },
      });
    }
  );
  next();
};
