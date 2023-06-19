import { Router } from "express";

import {
  phoneticMatchingHandler,
  textSentimentHandler,
  textSimilarityHandler,
} from "./services.controller";

import {
  phoneticMatchingSchema,
  textSentimentSchema,
  textSimilaritySchema,
} from "./services.schema";

import ensureApiKey from "../../middlewares/ensure-apikey";
import validate from "../../middlewares/validate-requests";
import validateApiKey from "../../middlewares/validate-apikey";

const router = Router();

router.get("/", (req, res) => {
  return res.json("1. Text Similarity\n2. Text Sentiment");
});

router.post(
  "/similarity",
  [ensureApiKey, validateApiKey, validate(textSimilaritySchema)],
  textSimilarityHandler
);

router.post(
  "/sentiment",
  [ensureApiKey, validateApiKey, validate(textSentimentSchema)],
  textSentimentHandler
);

router.post(
  "/phonetics",
  [ensureApiKey, validateApiKey, validate(phoneticMatchingSchema)],
  phoneticMatchingHandler
);

export default router;
