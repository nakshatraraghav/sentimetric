import * as nanoid from "nanoid";

const charset = `0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz-`;

export function generateId() {
  const id = nanoid.customAlphabet(charset, 32);
  return id();
}
