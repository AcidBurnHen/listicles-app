export default async function logout(req, res) {
  if (req.method === "GET") {
    return res.json("hello");
  }
}
