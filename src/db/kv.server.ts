import { Redis } from "@upstash/redis";
import logger from "../libs/logger";
import env from "../libs/zenv";

function connect() {
  try {
    const kv = new Redis({
      url: env.REDIS_URL,
      token: env.REDIS_TOKEN,
    });

    logger.info("server connected to redis");
    return kv;
  } catch (error) {
    logger.error("server failed to connect to redis");
    logger.error(error);
  }
}

const kv = connect();

export default kv;
