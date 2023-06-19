import jwt from "jsonwebtoken";

import env from "../../libs/zenv";

export default function verifyToken(token: string) {
  try {
    const decoded = jwt.verify(token, env.PRIVATE_KEY);
    return {
      user: decoded,
      expired: false,
    };
  } catch (error: any) {
    return {
      user: null,
      expired: error.message === "jwt expired",
    };
  }
}
