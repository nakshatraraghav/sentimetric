import { z } from "zod";

import * as errors from "./user.error";

export const createUserSchema = z.object({
  name: z
    .string({
      required_error: errors.name_errors.required_error,
      invalid_type_error: errors.name_errors.invalid_type,
    })
    .min(2, errors.name_errors.min_length)
    .max(30, errors.name_errors.max_length),
  username: z
    .string({
      required_error: errors.username_errors.required_error,
      invalid_type_error: errors.username_errors.invalid_type,
    })
    .min(6, errors.username_errors.min_length)
    .max(30, errors.username_errors.max_length),
  email: z
    .string({
      required_error: errors.email_errors.required_error,
      invalid_type_error: errors.email_errors.invalid_type,
    })
    .email(errors.email_errors.invalid_email)
    .min(5, errors.email_errors.min_length)
    .max(30, errors.email_errors.max_length),
  password: z
    .string({
      required_error: errors.password_errors.required_error,
      invalid_type_error: errors.password_errors.invalid_type,
    })
    .min(8, errors.password_errors.min_length)
    .max(30, errors.password_errors.max_length),
});

export type createUserBodyType = z.infer<typeof createUserSchema>;
