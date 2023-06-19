import { Router } from "express";

import { createUserHandler, deleteUserHandler } from "./user.controller";

import validate from "../../middlewares/validate-requests";
import hashPasswords from "../../middlewares/hash-passwords";

import { createUserSchema } from "./user.schema";
import authentication from "../../middlewares/authentication";

const router = Router();

router.post(
  "/",
  [validate(createUserSchema), hashPasswords],
  createUserHandler
);

router.delete("/", authentication, deleteUserHandler);

export default router;
