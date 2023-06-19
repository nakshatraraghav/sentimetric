import type { Request, Response } from "express";
import type {
  textSimilarityBodyType,
  textSentimentBodyType,
  phoneticMatchingBodyType,
} from "./services.schema";

import { createRequestType, storeRequest } from "../requests/requests.service";
import {
  textSimilarity,
  calculateTextSentiment,
  phoneticMatching,
} from "./services.service";

import getip from "../../utils/get-ip";
import { createRequestData } from "../../utils/request";

export async function textSimilarityHandler(
  req: Request<{}, {}, textSimilarityBodyType>,
  res: Response
) {
  try {
    const start = new Date();

    const similarityIndex = textSimilarity(req.body.text1, req.body.text2);

    if (similarityIndex === null) {
      return res.status(500).json({
        success: false,
        error: "Internal server error",
      });
    }

    const duration = new Date().getTime() - start.getTime();

    // persist the api request
    const request = createRequestData(
      req,
      duration,
      res.locals.apiKeyId as string,
      res.locals.apikey as string
    );

    const apiRequest = await storeRequest(request);

    if (!apiRequest) {
      return res.status(500).json({
        success: false,
        error: "Internal server error || could not store the request",
      });
    }

    return res.status(200).json({
      success: true,
      text1: req.body.text1,
      text2: req.body.text2,
      similarity_index: similarityIndex,
      duration: `${duration}ms`,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

export async function textSentimentHandler(
  req: Request<{}, {}, textSentimentBodyType>,
  res: Response
) {
  try {
    const start = new Date();

    const sentiment = calculateTextSentiment(req.body.text);

    if (sentiment === null) {
      return res.status(500).json({
        success: false,
        error: "Internal server error",
      });
    }

    const duration = new Date().getTime() - start.getTime();

    const request = createRequestData(
      req,
      duration,
      res.locals.apiKeyId as string,
      res.locals.apikey as string
    );

    const apiRequest = await storeRequest(request);

    if (!apiRequest) {
      return res.status(500).json({
        success: false,
        error: "Internal server error || could not store the request",
      });
    }

    return res.status(200).json({
      success: true,
      text: req.body.text,
      sentiment_score: sentiment,
      duration: `${duration}ms`,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

export async function phoneticMatchingHandler(
  req: Request<{}, {}, phoneticMatchingBodyType>,
  res: Response
) {
  try {
    const start = new Date();

    const phonetix = await phoneticMatching(req.body.worda, req.body.wordb);

    const duration = new Date().getTime() - start.getTime();

    const request = createRequestData(
      req,
      duration,
      res.locals.apiKeyId as string,
      res.locals.apikey as string
    );

    const apiRequest = await storeRequest(request);

    if (!apiRequest) {
      return res.status(500).json({
        success: false,
        error: "Internal server error || could not store the request",
      });
    }

    return res.status(200).json({
      success: true,
      worda: req.body.worda,
      wordb: req.body.wordb,
      match: phonetix,
      duration: `${duration}ms`,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}
