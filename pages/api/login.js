import { withIronSessionApiRoute } from "iron-session/next";
import { connection } from "../../lib/db";
import { sessionOptions } from "../../lib/session";
import crypto from "crypto";

export default withIronSessionApiRoute(async function loginRoute(req, res) {
  let error;
  let username;
  let password;

  if (!req.body.username || !req.body.password) {
    error = "You must send a username and password";
  } else {
    username = req.body.username;
    password = crypto
      .createHash("sha256")
      .update(req.body.password)
      .digest("base64");
  }

  const user = await connection.query("SELECT * FROM user WHERE username = ?", [
    username,
  ]);

  if (typeof error === "undefined" && user.length === 0) {
    error = "Wrong username or password";
  }

  if (typeof error === "undefined" && user[0].password === password) {
    req.session.user = {
      id: user[0].id,
      name: user[0].username,
      isLoggedIn: true,
    };
    await req.session.save();
  } else if (typeof error === "undefined") {
    error = "Wrong username or password";
  }

  res.send(!error ? { ok: true } : { ok: false, error });
}, sessionOptions);
