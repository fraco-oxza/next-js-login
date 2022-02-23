import { connection } from "../../lib/db";
import crypto from "crypto";

export default async function handler(req, res) {
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
  if (typeof error === "undefined") {
    try {
      await connection.query(
        "INSERT INTO user(username, password) VALUES (?,?)",
        [username, password]
      );
    } catch (err) {
      if (err.errno === 1062) {
        error = "The username already exist, please choose a different one";
      } else {
        error = JSON.stringify(err);
      }
    }
  }

  res.send(!error ? { ok: true } : { ok: false, error });
}
