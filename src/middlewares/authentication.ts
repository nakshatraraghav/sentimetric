import type { NextFunction, Request, Response } from "express";
import logger from "../libs/logger";
import { findSession } from "../modules/sessions/session.service";
import createTokens from "../utils/tokens/create";
import verifyToken from "../utils/tokens/verify";

export interface payload {
  uid: string;
  sid: string;
}

export default async function authentication(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // Step 1: Extract tokens from cookies
    const tokens = req.cookies.tokens;

    if (!tokens) {
      return res.json(
        "[Authentication Failed]: Authentication Cookies Missing"
      );
    }
    // Step 2: Check if access token exists on the cookie
    const access_token = tokens.accessToken;
    const refresh_token = tokens.refreshToken;

    if (!access_token) {
      return res.json("[Authentication Failed]: Access Token Missing");
    }
    // Step 3: Check if the access token is valid or not
    //    Step 3.1: If the access token is valid then return next(); + atttach user to res.locals.user
    const { user, expired: expiredAccessToken } = verifyToken(access_token);
    if (user) {
      res.locals.user = user;
      return next();
    }
    // Step 4: Now either the access token is invalid(tampered with) or is expired
    // Step 5: Extract the refresh token
    if (!refresh_token) {
      return res.json("[Authentication Failed]: Refresh Token Missing");
    }
    // Step 6: Check if the refresh token is valid or not
    //      Step 6.1: if valid and access token expired
    //      generate new tokens and store in cookies and return next(); + atttach user to res.locals.user
    const { user: payload } = verifyToken(refresh_token);

    if (payload && expiredAccessToken && payload instanceof Object) {
      const uid = payload.uid;
      const sid = payload.sid;

      if (!uid || !sid) {
        return res.json("[Authentication Failed]: Internal Server Error");
      }

      const session = await findSession(sid as string);

      if (!session) {
        return res.json("[Authentication Failed]: This session does not exist");
      }

      if (!session.valid) {
        return res.json(
          "[Authentication Failed]: Already logged out of this session please login again"
        );
      }

      if (session.userId !== uid) {
        return res.json(
          "[Authentication Failed]: This session does not belong to you"
        );
      }

      const tokens = await createTokens({
        uid: session.userId,
        sid: session.id,
      });

      res.cookie("tokens", tokens, {
        httpOnly: true,
      });

      res.locals.user = payload as payload;

      logger.info(`tokens regenerated for ${payload.uid}`);

      return next();
    }
    return res.json("[Authentication Failed]: Invalid Access Token");
    // Step 7: Now either the refresh token is invalid(tampered with) or is expired
    //     Step 7.1: If the refresh token is expired then delete the cookies and return res.json("[Authentication]: Auth Failed");
    // Step 8: Delete the cookies and return res.json("[Authentication]: Auth Failed");
  } catch (error) {
    logger.error("authentication failed", error);
    return res.json("[Authentication]: Auth Failed");
  }
}
