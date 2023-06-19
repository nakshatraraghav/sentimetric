import express from "express";

import helmet from "helmet";
import cookieParser from "cookie-parser";

import router from "./router";
import connect from "./utils/connect";
import logger from "./libs/logger";
import env from "./libs/zenv";
import ratelimit from "./middlewares/ratelimit";

import { connectkv } from "./db/kv.server";

const app = express();

app.use(ratelimit);
app.use(express.json());
app.use(helmet());
app.use(cookieParser());

router(app);
connect();
connectkv();

app.listen(env.PORT, () => {
  logger.info(`server listening on localhost:${env.PORT}`);
});
