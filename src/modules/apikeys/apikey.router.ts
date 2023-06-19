import { Router } from "express";

import {
  generateApiKeyHandler,
  getActiveApiKeyHandler,
  revokeApiKeyHandler,
} from "./apikey.controller";

import authentication from "../../middlewares/authentication";
import checkUser from "../../middlewares/check-user";
import ensureApiKey from "../../middlewares/ensure-apikey";

const router = Router();

router.get("/", [authentication, checkUser], getActiveApiKeyHandler);

// Create API Key
router.post("/", [authentication, checkUser], generateApiKeyHandler);
// Revoke API Key

router.delete(
  "/",
  [authentication, checkUser, ensureApiKey],
  revokeApiKeyHandler
);

export default router;
