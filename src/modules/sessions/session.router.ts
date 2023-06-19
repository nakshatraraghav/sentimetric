import { Router } from "express";

import {
  createSessionHandler,
  getAllActiveSessionsHandler,
  getCurrentSessionHandler,
  invalidateAllSessionHandler,
  invalidateSessionHandler,
} from "./session.controller";

import authentication from "../../middlewares/authentication";
import validate from "../../middlewares/validate-requests";
import checkUser from "../../middlewares/check-user";

import { createSessionSchema } from "./session.schema";

const router = Router();

router.post("/", validate(createSessionSchema), createSessionHandler);

router.get("/", [authentication, checkUser], getCurrentSessionHandler);

router.get("/all", [authentication, checkUser], getAllActiveSessionsHandler);

router.delete("/", [authentication, checkUser], invalidateSessionHandler);

router.delete("/all", [authentication, checkUser], invalidateAllSessionHandler);

export default router;
