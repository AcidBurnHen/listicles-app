import prisma from "@/lib/prisma";
import { hash } from "bcrypt";
import crypto from "crypto";
import nodemailer from "nodemailer";

export default async function signup(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Couldn't sign up. Please try again" });
  }

  const userEmail = await prisma.user.findUnique({
    where: {
      email: req.body.email
    }
  });

  if (userEmail) {
    res.status(400).json({ error: "This email is already associated with another user" });
  }

  const userName = await prisma.user.findUnique({
    where: {
      username: req.body.username
    }
  });

  if (userName) {
    res.status(400).json({ error: "This username is already associated with another user" });
  }

  hash(req.body.password, 10, async (err, hash) => {
    if (err) {
      res.status(405).json({ error: "Couldn't sign up. Please try again" });
    }

    const user = await prisma.user.create({
      data: {
        name: req.body.name,
        lastName: req.body.last_name,
        password: hash,
        username: req.body.username,
        email: req.body.email
      }
    });

    const token = crypto.randomBytes(16).toString("hex");
    const id = crypto.randomBytes(5).toString("hex");

    const email = await prisma.EmailToken.create({
      data: {
        id: id,
        userId: user.id,
        token: token
      }
    });

    const transporter = nodemailer.createTransport({
      port: 465,
      host: "smtp.gmail.com",
      auth: {
        user: process.env.EMAILER_USER,
        pass: process.env.EMAILER_PASS
      },
      secure: true
    });

    const text = "Hello " + user.name + ",\n\n" + "Please verify your account by clicking the link: \nhttp://" + req.headers.host + "/api/auth/verify/?user=" + user.id + "&token=" + email.token;

    const mail = {
      from: process.env.EMAILER_USER,
      to: user.email,
      subject: "Account Verification Link",
      text: text
    };

    await transporter.sendMail(mail, err => {
      if (err) {
        res.status(405).json({ error: "Something went wrong. Please try again" });
      }

      return res.status(200).send("A verification email has been sent to you. It will  expire after 30 mins. If you do not get a verification email click on resend");
    });
  });
}
