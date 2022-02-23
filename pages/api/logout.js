import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";

export default withIronSessionApiRoute(async (req, res) => {
  req.session.user = { isLoggedIn: false };
  await req.session.save();
  res.send({ ok: true });
}, sessionOptions);
