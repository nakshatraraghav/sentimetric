import { z } from "zod";
import logger from "./logger";

const schema = z.object({
  DATABASE_URL: z.string().url(),
  REDIS_URL: z.string().url(),
  REDIS_TOKEN: z.string(),
  PORT: z.string(),
  PRIVATE_KEY: z.string(),
  ACCESS_TOKEN_TTL: z.string(),
  REFRESH_TOKEN_TTL: z.string(),
});

function zenv() {
  try {
    const env = schema.parse(process.env);
    logger.info("environment variables parsed successfully ");
    return env;
  } catch (error) {
    logger.error("error parsing environment variables");
    logger.error(error);
    process.exit(1);
  }
}

const env = zenv();
export default env;
