import prisma from "@/lib/prisma";
import { userAllowed } from "@/lib/permissions";

export default userAllowed(async function getPosts(req, res) {
  if (req.method === "GET") {
    const posts = await prisma.post.findMany();

    res.json(posts);
  }
});