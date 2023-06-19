import redis from "ioredis";
import logger from "../libs/logger";

const kv = redis.createClient();

export function connectkv() {
  kv.on("connect", () => {
    logger.info("server connected to redis ");
  });

  kv.on("error", (error) => {
    logger.error("server could not connect to redis");
    logger.error(error);
  });
}

export default kv;
