import db from "../db/db.server";
import logger from "../libs/logger";

export default async function connect() {
  try {
    await db.$connect();
    logger.info("connected to postgresql database");
  } catch (error) {
    logger.error("error connecting to postgresql database");
    logger.error(error);
  }
}
