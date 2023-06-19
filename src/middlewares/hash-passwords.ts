import argon from "argon2";
import type { Request, Response, NextFunction } from "express";

export default async function hashPasswords(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const password: string = req.body.password;

  const hashed = await argon.hash(password);

  req.body.password = hashed;

  return next();
}
