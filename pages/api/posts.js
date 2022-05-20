import prisma from "@/lib/prisma";
import { verify } from "jsonwebtoken";

const authenticated = fn => async (req, res) => {
  verify(req.cookies.auth, process.env.JWT_SECRET, async (err, decoded) => {
    if (!err && decoded) {
      return await fn(req, res);
    } else {
      res.status(401).json({ message: "You do not have permissions to perfrom that action" });
    }
  });
};

export default authenticated(async function getPosts(req, res) {
  const posts = await prisma.post.findMany();

  res.json(posts);
});
