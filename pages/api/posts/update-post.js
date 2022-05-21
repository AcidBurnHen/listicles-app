import prisma from "@/lib/prisma";
import { editorAllowed } from "@/lib/permissions";

export default editorAllowed(async function updatePost(req, res) {
  if (req.method === "POST") {
    await prisma.post.update({
      where: {
        id: req.body.id
      },
      data: {
        title: req.body.title,
        slug: req.body.slug,
        content: req.body.content,
        excerpt: req.body.excerpt
      }
    });

    res.status(200).json({ msg: "Post updated" });
  } else {
    res.status(401).json({ error: "You can't perform that action." });
  }
});
