import type { Request, Response, NextFunction } from "express";

export default function ensureApiKey(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const key = req.headers["x-api-key"];

  if (!key) {
    return res
      .status(401)
      .json(
        "[API Auth Failed]: No API Key provided, Provide the API key in the X-Api-key Header"
      );
  }
  res.locals.apikey = key;
  return next();
}
