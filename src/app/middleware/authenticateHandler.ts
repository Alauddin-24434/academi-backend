// middleware/authenticate.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma";
import { catchAsyncHandler } from "./catchAsyncHandler";
import { envVariable } from "../config";

interface JwtDecodedPayload {
  id: string;
  role?: string;
  iat?: number;
  exp?: number;
}

export const authenticate = catchAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token: string | undefined;
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: Token missing" });
    }

    let decoded: JwtDecodedPayload;
    try {
      decoded = jwt.verify(
        token,
        envVariable.JWT_ACCESS_TOKEN_SECRET as string,
        { clockTolerance: 5 }
      ) as JwtDecodedPayload;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return res.status(401).json({ message: "Unauthorized: Token expired" });
      } else if (error instanceof jwt.JsonWebTokenError) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
      }
      throw error;
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, role: true },
    });

    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    req.user = user;
    next();
  }
);
