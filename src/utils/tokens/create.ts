import jwt from "jsonwebtoken";

import env from "../../libs/zenv";

export default function createTokens(payload: Object) {
  const accessToken = jwt.sign(payload, env.PRIVATE_KEY, {
    expiresIn: env.ACCESS_TOKEN_TTL,
  });

  const refreshToken = jwt.sign(payload, env.PRIVATE_KEY, {
    expiresIn: env.REFRESH_TOKEN_TTL,
  });

  return {
    accessToken,
    refreshToken,
  };
}
