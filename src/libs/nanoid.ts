import { customAlphabet } from "nanoid";

const charset = `0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz-`;

export function nanoid() {
  const nanoid = customAlphabet(charset, 32);
  return nanoid();
}
