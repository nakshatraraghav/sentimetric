import db from "../../db/db.server";
import logger from "../../libs/logger";

import type { createUserBodyType } from "./user.schema";

export async function createUser(input: createUserBodyType) {
  try {
    const user = await db.users.create({
      data: input,
      select: {
        id: true,
        username: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return user;
  } catch (error: any) {
    logger.info("error while creating the user");
    logger.error(error);
    throw error;
  }
}

export async function findUserByUsername(username: string) {
  try {
    const user = await db.users.findUniqueOrThrow({
      where: { username },
    });
    return user;
  } catch (error: any) {
    logger.error("error while finding the user by username");
    logger.error(error.message);
    return null;
  }
}

export async function deleteUser(id: string) {
  try {
    await db.users.delete({
      where: {
        id,
      },
    });
    return true;
  } catch (error: any) {
    logger.error("error while deleting the user");
    logger.error(error.message);
    throw error;
  }
}
