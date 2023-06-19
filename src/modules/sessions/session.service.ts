import db from "../../db/db.server";
import logger from "../../libs/logger";

export async function createSession(
  userId: string,
  ip: string,
  userAgent: string
) {
  try {
    const session = await db.session.create({
      data: {
        userAgent,
        ip,
        userId,
      },
    });
    return session;
  } catch (error: any) {
    logger.error("error while creating the session");
    logger.error(error.message);
    return null;
  }
}

export async function findSession(id: string) {
  try {
    const session = await db.session.findUnique({
      where: {
        id,
      },
    });
    return session;
  } catch (error: any) {
    logger.error("error while finding the session");
    logger.error(error.message);
    return null;
  }
}

export async function getAllActiveSessions(userId: string) {
  try {
    const sessions = await db.session.findMany({
      where: {
        userId,
        valid: true,
      },
    });
    return sessions;
  } catch (error: any) {
    logger.error("error while finding all the sessions");
    logger.error(error.message);
    throw error;
  }
}

export async function invalidateSession(id: string) {
  try {
    const session = await db.session.update({
      where: {
        id,
      },
      data: {
        valid: false,
      },
    });
    return session;
  } catch (error: any) {
    logger.error("error while invalidating the session");
    logger.error(error.message);
    throw error;
  }
}

export async function invalidateAllSessions(userId: string) {
  try {
    await db.session.updateMany({
      where: {
        AND: [{ userId }, { valid: true }],
      },
      data: {
        valid: false,
      },
    });
  } catch (error: any) {
    logger.error("error while invalidating all the sessions");
    logger.error(error.message);
    throw error;
  }
}
