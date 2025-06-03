import { User } from "@/models";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import type { NextFunction, Request, Response } from "express";

const authMiddleware = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token;
    if (req?.headers?.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
      try {
        if (token) {
          const decoded = jwt.verify(token, process.env.JWT_SECRET!);
          // console.log(decoded);
          const user = await User.findById(decoded?.id);
          req.user = user;
          next();
        }
      } catch (error) {
        throw new Error("Not Authorized token expired, Please login again");
      }
    } else {
      throw new Error("There is no token attached to header");
    }
  }
);

const isAdmin = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req?.user) {
      throw new Error("User not found");
    }

    const { email } = req?.user;
    const user = await User.findOne({ email });
    if(user?.roles.some("admin")) {

    }
  }
);

module.exports = { authMiddleware, isAdmin };
