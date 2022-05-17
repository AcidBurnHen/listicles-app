import prisma from "../../lib/prisma";
import { hash } from "bcrypt";

export default async function signup(req, res) {
  if (req.method === "POST") {
    hash(req.body.password, 10, async (err, hash) => {
      const user = await prisma.user.create({
        data: {
          name: req.body.name,
          lastName: req.body.last_name,
          password: hash,
          username: req.body.username,
          email: req.body.email
        }
      });
      console.log(user);

      const users = await prisma.user.findMany();

      console.log(users);

      res.json(user);
    });
  } else {
    res.status(405).json("Please try again");
  }
}
