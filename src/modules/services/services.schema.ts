import { z } from "zod";

import {
  textSimilarityErrors,
  sentimentErrors,
  phoneticMatchingErrors,
} from "./services.error";

const textone = textSimilarityErrors(1);
const texttwo = textSimilarityErrors(2);

const wordone = phoneticMatchingErrors(1);
const wordtwo = phoneticMatchingErrors(1);

export const textSimilaritySchema = z.object({
  text1: z
    .string({
      required_error: textone.required_error,
      invalid_type_error: textone.invalid_type,
    })
    .min(10, textone.min_length)
    .max(1000, textone.max_length),
  text2: z
    .string({
      required_error: texttwo.required_error,
      invalid_type_error: texttwo.invalid_type,
    })
    .min(10, texttwo.min_length)
    .max(1000, texttwo.max_length),
});

export const textSentimentSchema = z.object({
  text: z
    .string({
      required_error: sentimentErrors.required_error,
      invalid_type_error: sentimentErrors.invalid_type,
    })
    .min(10, sentimentErrors.min_length)
    .max(1000, sentimentErrors.max_length),
});

export const phoneticMatchingSchema = z.object({
  worda: z
    .string({
      required_error: wordone.required_error,
      invalid_type_error: wordone.invalid_type,
    })
    .min(2, wordone.min_length)
    .max(25, wordone.max_length),
  wordb: z
    .string({
      required_error: wordtwo.required_error,
      invalid_type_error: wordtwo.invalid_type,
    })
    .min(2, wordtwo.min_length)
    .max(25, wordtwo.max_length),
});

export type textSimilarityBodyType = z.infer<typeof textSimilaritySchema>;
export type textSentimentBodyType = z.infer<typeof textSentimentSchema>;
export type phoneticMatchingBodyType = z.infer<typeof phoneticMatchingSchema>;
