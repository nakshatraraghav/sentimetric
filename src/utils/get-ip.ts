import type { Request } from "express";

export default function getip(req: Request) {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "";
  return ip;
}
