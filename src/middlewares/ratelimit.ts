import type { Request, Response, NextFunction } from "express";

import kv from "../db/kv.server";
import getip from "../utils/get-ip";

export default async function ratelimit(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const ip = getip(req) as string;

    const requests = await kv.incr(ip);

    if (requests > 20) {
      await kv.expire(ip, 20);

      return res
        .status(429)
        .json("The user has sent too many requests in a given amount of time");
    }

    return next();
  } catch (error) {}
}
