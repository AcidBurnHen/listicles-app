import prisma from "@/lib/prisma";
import { authorAllowed } from "@/lib/permissions";

export default authorAllowed(async function createPost(req, res) {
  if (req.method === "POST") {
    await prisma.post.create({
      data: {
        title: req.body.title,
        slug: req.body.slug,
        content: req.body.content,
        excerpt: req.body.excerpt
      }
    });

    res.status(201).json({ msg: "Created a draft post." });
  } else {
    res.status(401).json({ error: "You can't perform that action." });
  }
});
