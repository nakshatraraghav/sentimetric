import db from "../../db/db.server";
import logger from "../../libs/logger";

export interface createRequestType {
  ip: string;
  userAgent: string;
  method: string;
  path: string;
  status: number;
  duration: number;
  apiKeyId: string;
  apiKeyUsed: string;
}

export async function getAllApiRequests(userId: string) {
  try {
    const requests = await db.apikey.findMany({
      where: {
        userId,
      },
      include: {
        apiRequests: true,
      },
    });

    return requests;
  } catch (error) {
    logger.error(error);
    throw error;
  }
}

export async function storeRequest(input: createRequestType) {
  try {
    const request = await db.apiRequest.create({
      data: {
        ip: input.ip,
        userAgent: input.userAgent,
        method: input.method,
        path: input.path,
        status: input.status,
        duration: input.duration,
        apikeyId: input.apiKeyId,
        apikeyUsed: input.apiKeyUsed,
      },
    });

    return request;
  } catch (error) {
    logger.error(error);
    throw error;
  }
}
