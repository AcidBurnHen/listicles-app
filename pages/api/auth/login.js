import prisma from "@/lib/prisma";
import { compare } from "bcrypt";
import { getSession } from "@/lib/get-session";

export default async function login(req, res) {
  if (req.method === "POST") {
    const user = await prisma.user.findUnique({
      where: {
        email: req.body.email
      }
    });

    compare(req.body.password, user.password, async (err, result) => {
      if (!err && result) {
        const session = await getSession(req, res);
        const userData = { id: user.id, name: user.username, avatar: user.avatar };

        session.cookie.user = userData;

        res.send(session);
      } else {
        res.json({ error: "Failed to log in. Wrong username or password." });
      }
    });
  } else {
    res.status(405).json({ error: "Failed to log in. Please try again." });
  }
}

export const config = {
  api: {
    externalResolver: true
  }
};
