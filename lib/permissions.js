import prisma from "@/lib/prisma";
import { getSession } from "./get-session";

const getUser = async (req, res) => {
  const session = await getSession(req, res);

  const user = await prisma.user.findUnique({
    where: {
      id: req.session.user.id
    }
  });

  return user;
};

export const userAllowed = handle => async (req, res) => {
  const user = await getUser(req, res).then(res => {
    return res;
  });

  if (user && user.role === "USER") {
    return await handle(req, res);
  } else {
    res.status(401).json({ error: "Please log in or sign up to view this page" });
  }
};
