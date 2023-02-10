import React, { useState, useEffect } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://server-crud-node.onrender.com/login",
        {
          email,
          password,
        }
      );

      setToken(response.data.token);
    } catch (error) {
      console.error(error);
    }
  };

  const getAuth = async () => {
    while (!token) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    const header = {
      headers: {
        authorization: `${token}`,
      },
    };

    try {
      const result = await axios.get(
        "https://server-crud-node.onrender.com/token/auth",
        header
      );

      console.log(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAuth();
  }, [token]);

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
