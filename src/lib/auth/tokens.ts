import { type JWTPayload, jwtVerify, SignJWT } from "jose";

const key = new TextEncoder().encode(
  process.env.JWT_SECRET_KEY ?? "jwt_secret_key",
);

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
  });
  return payload;
}
