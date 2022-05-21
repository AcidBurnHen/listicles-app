import prisma from "@/lib/prisma";
import { hash } from "bcrypt";

export default async function signup(req, res) {
  if (req.method === "POST") {
    hash(req.body.password, 10, async (err, hash) => {
      await prisma.user.create({
        data: {
          name: req.body.name,
          lastName: req.body.last_name,
          password: hash,
          username: req.body.username,
          email: req.body.email
        }
      });

      res.status(201).json({ msg: "Successfully signed up!" });
    });
  } else {
    res.status(405).json({ error: "Couldn't sign up. Please try again" });
  }
}
