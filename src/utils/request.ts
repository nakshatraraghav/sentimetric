import type { Request } from "express";

import getip from "./get-ip";
import { createRequestType } from "../modules/requests/requests.service";

export function createRequestData(
  req: Request,
  duration: number,
  apiKeyId: string,
  apiKeyUsed: string
) {
  const request: createRequestType = {
    ip: getip(req) as string,
    userAgent: req.headers["user-agent"] || "",
    method: req.method,
    path: req.path,
    status: 200,
    duration,
    apiKeyId: apiKeyId as string,
    apiKeyUsed: apiKeyUsed as string,
  };

  return request;
}
