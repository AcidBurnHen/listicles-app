import prisma from "../../../lib/prisma";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

export default async function login(req, res) {
  if (req.method === "POST") {
    // Add later - if person is defined validation

    const user = await prisma.user.findUnique({
      where: {
        email: req.body.email
      }
    });

    compare(req.body.password, user.password, async (err, result) => {
      if (!err && result) {
        const userData = { id: user.id, name: user.username, avatar: user.avatar };
        const jwt = sign(userData, process.env.JWT_SECRET, { expiresIn: "24h" });
        res.json({ authToken: jwt });
      } else {
        res.json({ message: "Failed to log in" });
      }
    });

    console.log(user);
  } else {
    res.status(405).json({ message: "Please try again" });
  }
}
