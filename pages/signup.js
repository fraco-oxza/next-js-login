import axios from "axios";
import React, { useCallback, useState } from "react";
import Router from "next/router";
import useUser from "../lib/useUser";

export default function SignUp() {
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
      const result = await axios.post("/api/signup", {
        username: name,
        password,
      });
      result.data.ok ? Router.push("/login") : alert(result.data.error);
    },
    [name, password]
  );

  return (
    <>
      <h1>Sign Up</h1>
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
    </>
  );
}
