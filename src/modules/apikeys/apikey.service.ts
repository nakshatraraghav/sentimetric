import db from "../../db/db.server";
import logger from "../../libs/logger";

export async function findValidApiKey(id: string) {
  try {
    const key = await db.apikey.findFirst({
      where: {
        AND: [{ userId: id }, { enabled: true }],
      },
    });

    return key;
  } catch (error) {
    logger.error("Failed to find the api key");
    logger.error(error);
  }
}

export async function findApiKey(key: string) {
  try {
    const apikey = await db.apikey.findFirst({
      where: {
        key,
      },
    });

    return apikey;
  } catch (error) {
    logger.error("Failed to find the api key");
    logger.error(error);
    return null;
  }
}

export async function storeApiKey(userId: string, apiKey: string) {
  try {
    const apikey = await db.apikey.create({
      data: {
        userId,
        key: apiKey,
      },
    });

    return apikey;
  } catch (error: any) {
    logger.info("error while creating the api key");
    logger.error(error.message);
    throw error;
  }
}

export async function revokeApiKey(id: string) {
  try {
    const apikey = await db.apikey.update({
      where: {
        id,
      },
      data: {
        enabled: false,
      },
    });
    return apikey;
  } catch (error: any) {
    logger.info("error while creating the api key");
    logger.error(error.message);
    return null;
  }
}
