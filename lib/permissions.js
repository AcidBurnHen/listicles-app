import prisma from "@/lib/prisma";
import { getSession } from "./get-session";
import { isNew } from "next-session/lib/helpers";

const getUser = async (req, res) => {
  const session = await getSession(req, res);

  console.log(isNew(req.session));

  if (isNew(req.session) === false) {
    const user = await prisma.user.findUnique({
      where: {
        id: req.session.user.id
      }
    });
  } else {
    res.status(405).json({ error: "You need to log in to view this page" });
  }

  return user;
};

export const userAllowed = handle => async (req, res) => {
  const user = await getUser(req, res).then(res => {
    return res;
  });

  if ((user && user.role === "USER") || (user && user.role === "AUTHOR") || (user && user.role === "EDITOR") || (user && user.role === "ADMIN")) {
    return await handle(req, res);
  } else {
    res.status(401).json({ error: "You cannot access this page, please log in or register" });
  }
};

export const authorAllowed = handle => async (req, res) => {
  const user = await getUser(req, res).then(res => {
    return res;
  });

  if ((user && user.role === "AUTHOR") || (user && user.role === "EDITOR") || (user && user.role === "ADMIN")) {
    return await handle(req, res);
  } else {
    res.status(401).json({ error: "Insufficient permission, you can't not perform this action." });
  }
};

export const editorAllowed = handle => async (req, res) => {
  const user = await getUser(req, res)
    .then(res => {
      return res;
    })
    .catch(err => {
      console.log(err);
      res.end();
    });

  if ((user && user.role === "EDITOR") || (user && user.role === "ADMIN")) {
    return await handle(req, res);
  } else {
    res.status(401).json({ error: "Insufficient permission, you can't perform this action." });
  }
};

export const adminAllowed = handle => async (req, res) => {
  const user = await getUser(req, res).then(res => {
    return res;
  });

  if (user && user.role === "ADMIN") {
    return await handle(req, res);
  } else {
    res.status(401).json({ error: "Insufficient permission, you can't perform this action." });
  }
};
