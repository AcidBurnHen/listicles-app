import prisma from "@/lib/prisma";
import { compare } from "bcrypt";
import { getSession } from "@/lib/get-session";

export default async function login(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Failed to log in. Please try again." });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: req.body.email
    }
  });

  if (!user) {
    res.status(401).json({ error: "No user found with this email, register a new account." });
  }

  compare(req.body.password, user.password, async (err, result) => {
    if (err) {
      res.status(401).json({ error: "Failed to log in. Wrong email or password." });
    }

    if (user.emailVerifed === false) {
      res.status(401).json({ error: "Your email has not been verified. Check your email or click resend" });
    }

    if (result) {
      const session = await getSession(req, res);
      const userData = { id: user.id, name: user.username, avatar: user.avatar };

      session.user = userData;
      res.status(200).send(session.user);
    }
  });
}

export const config = {
  api: {
    externalResolver: true
  }
};
