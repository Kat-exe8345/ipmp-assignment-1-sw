import bcrypt from "bcryptjs";

// function to hash password
export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

// compare password for verification
export async function verifyPassword(password: string, hash: string) {
  return await bcrypt.compare(password, hash);
}
