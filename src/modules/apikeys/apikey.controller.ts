import type { Request, Response } from "express";
import {
  findApiKey,
  findValidApiKey,
  revokeApiKey,
  storeApiKey,
} from "./apikey.service";

import { nanoid } from "../../libs/nanoid";
import { payload } from "../../middlewares/check-user";
import logger from "../../libs/logger";

export async function getActiveApiKeyHandler(req: Request, res: Response) {
  try {
    const payload = res.locals.user as payload;
    console.log(payload);
    const apikey = await findValidApiKey(payload.uid);

    logger.info(apikey);

    if (!apikey) {
      return res
        .status(404)
        .send("[Api Key Access]: You don't have any active api key");
    }

    return res.json({ apikey: apikey.key });
  } catch (error) {
    return res.json("[Api Key Access]: Failed to get the api key");
  }
}

export async function generateApiKeyHandler(req: Request, res: Response) {
  try {
    const payload = res.locals.user as payload;

    // Step 2: check if user already has a API Key
    const key = await findValidApiKey(payload.uid);

    if (key) {
      return res.status(409).send("API key already exists for this user.");
    }
    // Step 3: Generate a API Key
    const newkey = nanoid();
    // Step 4: Insert API Key in database
    const apiKey = await storeApiKey(payload.uid, newkey);

    if (!apiKey) {
      return res.json(
        "[Api Key Generation]: Failed to generate api key try later"
      );
    }

    // Step 5: Send API Key as response

    return res.setHeader("x-api-key", apiKey.key).json({ apikey: apiKey.key });
  } catch (error) {
    return res.json("[Api Key Generation]: Failed to generate api key");
  }
}

export async function revokeApiKeyHandler(req: Request, res: Response) {
  try {
    const payload = res.locals.user as payload;
    const key = res.locals.apikey as string;

    // Step 1: Check if the api is valid
    const apikey = await findApiKey(key);

    if (!apikey) {
      return res.status(404).send("[API Authentication]: Invalid API Key");
    }

    // Step 2: Check if the api key belongs to the user
    if (apikey.userId !== payload.uid) {
      return res.status(401).send("[API Authentication]: Unauthorized");
    }

    if (!apikey.enabled) {
      return res
        .status(401)
        .send("[API Authentication]: API Key already revoked");
    }
    // Step 3: Revoke the api key
    const revoked = await revokeApiKey(apikey.id);

    if (!revoked) {
      return res.status(500).send("[API Authentication]: Failed to revoke");
    }

    // Step 4: Send response
    return res.status(200).send("[API Authentication]: Revoked");
  } catch (error) {
    return res.status(500).send("[API Authentication]: Failed to revoke");
  }
}
