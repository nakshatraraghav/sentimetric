import type { Request, Response, NextFunction } from "express";

import { findApiKey } from "../modules/apikeys/apikey.service";

export default async function validateApiKey(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const apikey = res.locals.apikey;

  const apiKey = await findApiKey(apikey);

  if (!apiKey) {
    return res.status(401).json("[API Authentication]: Invalid API Key");
  }

  if (!apiKey.enabled) {
    return res
      .status(401)
      .json("[API Authentication]: API Key already revoked");
  }

  res.locals.apiKeyId = apiKey.id;

  return next();
}
