import nextSession from "next-session";
import { promisifyStore } from "next-session/lib/compat";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import signature from "cookie-signature";

const secret = process.env.COOKIE_SECRET;

const connectStore = new PrismaSessionStore(prisma, {
  checkPeriod: 300 * 1000,
  dbRecordIdIsSessionId: true,
  dbRecordIdFunction: undefined
});

export const getSession = nextSession({
  store: promisifyStore(connectStore),
  decode: raw => signature.unsign(raw.slice(2), secret),
  encode: sid => (sid ? "s:" + signature.sign(sid, secret) : null),
  cookie: {
    httpOnly: true,
    sameSite: "strict",
    path: "/",
    maxAge: 3600 * 24,
    secure: process.env.NODE_ENV !== "development"
  }
});
