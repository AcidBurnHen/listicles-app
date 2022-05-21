import prisma from "@/lib/prisma";
import { userAllowed } from "@/lib/permissions";

export default userAllowed(async function getPosts(req, res) {
  if (req.method === "GET") {
    const posts = await prisma.post.findMany();

    res.status(200).json(posts);
  } else {
    res.status(405).json({ error: "You must be logged in to view this page" });
  }
});
