import type { Request, Response } from "express";
import { Prisma } from "@prisma/client";
import type { payload } from "../../middlewares/authentication";

import { createUserBodyType } from "./user.schema";
import { createUser, deleteUser } from "./user.service";

export async function createUserHandler(
  req: Request<{}, {}, createUserBodyType>,
  res: Response
) {
  try {
    const user = await createUser(req.body);
    return res.status(201).json(user);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientValidationError) {
      return res.status(422).json({ error: "Validation error" });
    }
    return res
      .status(409)
      .json({ error: "User with the same username or email already exists" });
  }
}

export async function deleteUserHandler(req: Request, res: Response) {
  try {
    const payload = res.locals.user as payload;
    await deleteUser(payload.uid);
    res.clearCookie("tokens");
    return res.json("[Delete User]: User Deleted Successfully");
  } catch (error) {
    res.clearCookie("tokens");
    return res.json("[Delete User]: Record to delete does not exist");
  }
}
