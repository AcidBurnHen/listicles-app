import prisma from "@/lib/prisma";
import { adminAllowed } from "@/lib/permissions";

export default adminAllowed(async function deletePost(req, res) {
  if (req.method === "POST") {
    await prisma.post.delete({
      where: {
        id: req.body.id
      }
    });

    res.status(200).json({ msg: "Post deleted" });
  } else {
    res.status(401).json({ error: "You can't perform that action." });
  }
});
