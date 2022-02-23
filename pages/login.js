import axios from "axios";
import React, { useCallback, useState } from "react";
import Router from "next/router";
import Link from "next/link";
import useUser from "../lib/useUser";

export default function Login() {
  useUser("/", true);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeName = useCallback((event) => {
    setName(event.target.value);
  }, []);
  const handleChangePassword = useCallback((event) => {
    setPassword(event.target.value);
  }, []);
  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      const result = await axios.post("/api/login", {
        username: name,
        password,
      });
      result.data.ok ? Router.push("/") : alert(result.data.error);
    },
    [name, password]
  );

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username: </label>
        <br />
        <input
          type="text"
          name="username"
          value={name}
          onChange={handleChangeName}
        />
        <br />
        <label htmlFor="password">Password: </label>
        <br />
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChangePassword}
        />
        <br />
        <input type="submit" />
      </form>
      <span>You do not have an account?</span>
      <br />
      <Link href="/signup">
        <a>Create One</a>
      </Link>
    </>
  );
}
