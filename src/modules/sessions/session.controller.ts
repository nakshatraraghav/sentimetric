import type { Request, Response } from "express";
import type { createSessionBodyType } from "./session.schema";
import type { payload } from "../../middlewares/authentication";

import { findUserByUsername } from "../users/user.service";
import {
  createSession,
  findSession,
  getAllActiveSessions,
  invalidateAllSessions,
  invalidateSession,
} from "./session.service";

import logger from "../../libs/logger";
import getip from "../../utils/get-ip";
import createTokens from "../../utils/tokens/create";
import verifyPassword from "../../utils/verify-password";

export async function createSessionHandler(
  req: Request<{}, {}, createSessionBodyType>,
  res: Response
) {
  try {
    // Step 1: Check if the user exists
    const user = await findUserByUsername(req.body.username);
    if (!user) {
      return res.json(
        "Invalid credentials. Please check your username and password and try again"
      );
    }

    // Step 2: Verify password
    const valid = await verifyPassword(user.password, req.body.password);
    if (!valid) {
      return res.json(
        "Invalid credentials. Please check your username and password and try again"
      );
    }

    // Step 3: Create the sessio
    const session = await createSession(
      user.id,
      getip(req) as string,
      req.headers["user-agent"] || ""
    );
    if (!session) {
      return res.status(500).json({
        error: "error while creating the session",
      });
    }

    // Step 4: generate the tokens and return as cookies
    const tokens = createTokens({
      uid: user.id,
      sid: session.id,
    });

    res.cookie("tokens", tokens, {
      httpOnly: true,
    });
    return res.json(
      "[Authentication Succeded]: Tokens stored in HTTPOnly Cookies"
    );
  } catch (error: any) {
    logger.error(error.message);
    return res.send("failed to login, please try later");
  }
}

export async function getCurrentSessionHandler(req: Request, res: Response) {
  const payload = res.locals.user as payload;

  const session = await findSession(payload.sid);

  if (!session) {
    return res.json({
      message: "No active session found",
    });
  }

  return res.json({
    session,
  });
}

export async function getAllActiveSessionsHandler(req: Request, res: Response) {
  const payload = res.locals.user as payload;

  const sessions = await getAllActiveSessions(payload.uid);

  if (!sessions) {
    return res.json({
      message: "No active session found",
    });
  }

  return res.json({
    sessions,
  });
}

export async function invalidateSessionHandler(req: Request, res: Response) {
  try {
    const payload = res.locals.user as payload;
    const session = await invalidateSession(payload.sid);
    res.clearCookie("tokens");
    return res.json({
      status: "session invalidated",
      session,
    });
  } catch (error: any) {
    logger.error(error.message);
    return res.json("[Authentication Error]: Failed to logout, try again");
  }
}

export async function invalidateAllSessionHandler(req: Request, res: Response) {
  try {
    const payload = res.locals.user as payload;
    await invalidateAllSessions(payload.uid);

    return res.clearCookie("tokens").json({
      message: "[Authentication Success]: Successfully logged out",
    });
  } catch (error: any) {
    logger.error(error.message);
    return res
      .status(500)
      .json(
        "[Authentication Error]: Failed to logout from all devices, try again"
      );
  }
}
