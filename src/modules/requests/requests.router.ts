import { Router } from "express";
import { getAllApiRequestsHandler } from "./requests.controller";
import authentication from "../../middlewares/authentication";
import checkUser from "../../middlewares/check-user";

const router = Router();

router.get("/", [authentication, checkUser], getAllApiRequestsHandler);

export default router;
