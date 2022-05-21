import { getSession } from "@/lib/get-session";

export default async function logout(req, res) {
  if (req.method === "GET") {
    const session = await getSession(req, res);

    await session.destroy();

    res.status(200).json({ msg: "You just logged out." });
  } else {
    res.status(405).json({ error: "You need to be logged in to log out, please log in or register." });
  }
}
