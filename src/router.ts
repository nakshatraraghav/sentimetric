import type { Express, Request, Response } from "express";

import userRouter from "./modules/users/user.router";
import sessionRouter from "./modules/sessions/session.router";
import apikeyRouter from "./modules/apikeys/apikey.router";
import requestsRouter from "./modules/requests/requests.router";
import servicesRouter from "./modules/services/services.router";

export default function router(app: Express) {
  app.get("/", (req: Request, res: Response) => {
    return res.send("sentrimetric api v1 🚀🚀");
  });

  app.get("/health", (req: Request, res: Response) => {
    return res.send("ok");
  });

  app.use("/api/users", userRouter);
  app.use("/api/sessions", sessionRouter);
  app.use("/api/apikeys", apikeyRouter);
  app.use("/api/requests", requestsRouter);
  app.use("/api/services", servicesRouter);
}
