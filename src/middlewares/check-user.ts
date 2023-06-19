import type { Request, Response, NextFunction } from "express";

export type payload = {
  uid: string;
  sid: string;
};

export default function (req: Request, res: Response, next: NextFunction) {
  const user = res.locals.user;

  if (!user.uid) {
    throw new Error("[Authentication Error]: user id missing from payload");
  }

  if (!user.sid) {
    throw new Error("[Authentication Error]: session id missing from payload");
  }

  return next();
}
