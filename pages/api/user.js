import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";

export default withIronSessionApiRoute(function userRoute(req, res) {
  res.send({ ...req.session.user });
}, sessionOptions);
