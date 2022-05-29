import prisma from "@/lib/prisma";

export default async function verify(req, res) {
  if (req.method !== "GET") {
    res.status(500).json({ error: "Something went wrong" });
  }

  const token = await prisma.EmailToken.findUnique({
    where: {
      id: req.query.user
    }
  });

  if (token.token !== req.query.token) {
    res.status(500).json({ error: "Invalid or expired token, please re-send verification email" });
  }

  if (!token) {
    res.status(500).json({ error: "Invalid or expired token, please re-send verification email" });
  }

  const user = await prisma.user.findUnique({
    where: {
      id: token.userId
    }
  });

  if (!user) {
    res.status(500).json({ error: "Invalid or expired token, please re-send verification email" });
  }

  if (user.emailVerifed === true) {
    res.status(401).json({ error: "User has already been verified. Please log in" });
  }

  const verifyUser = await prisma.user.update({
    where: {
      id: token.userId,
      email: user.email
    },
    data: {
      emailVerified: true
    }
  });

  if (verifyUser) {
    await prisma.EmailToken.delete({
      where: {
        userId: user.id
      }
    });
  }
}
