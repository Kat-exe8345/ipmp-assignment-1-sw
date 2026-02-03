import { type JWTPayload, jwtVerify, SignJWT } from "jose";

const jwtSecret = process.env.JWT_SECRET_KEY;

if (!jwtSecret) {
  throw new Error("JWT_SECRET_KEY is not defined in environment variables");
}

const key = new TextEncoder().encode(jwtSecret);

export async function encryptSessionJwt(payload: JWTPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuer("kat-exe")
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(key);
}

export async function decryptSessionJwt(token: string) {
  const { payload } = await jwtVerify(token, key, {
    algorithms: ["HS256"],
    issuer: "kat-exe",
  });
  return payload;
}
