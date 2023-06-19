import { z } from "zod";

import * as errors from "./session.error";

export const createSessionSchema = z.object({
  username: z
    .string({
      invalid_type_error: errors.username_errors.invalid_type,
      required_error: errors.username_errors.required_error,
    })
    .min(6, errors.username_errors.min_length)
    .max(30, errors.username_errors.max_length),
  password: z
    .string({
      required_error: errors.password_errors.required_error,
      invalid_type_error: errors.password_errors.invalid_type,
    })
    .min(8, errors.password_errors.min_length)
    .max(30, errors.password_errors.max_length),
});

export type createSessionBodyType = z.infer<typeof createSessionSchema>;
