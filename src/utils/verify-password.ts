import argon from "argon2";

export default async function verifyPassword(hashed: string, plain: string) {
  return await argon.verify(hashed, plain);
}
