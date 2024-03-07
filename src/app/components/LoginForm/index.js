"use client";

import { requestInsert, setToken } from "@/app/api";
import { useState } from "react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isUser, setIsUser] = useState(true);


  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await requestInsert("/users/login", { email, password });
      localStorage.setItem("user", JSON.stringify(response));
      setToken(response.token);
      if (response && response.token) {
        router.push("/products");
      }
    } catch (error) {
      setError("Email ou senha incorretos");
    }
    setEmail("");
    setPassword("");
  };

  const handleClick = () => {
    setIsUser(!isUser);
    if (!isUser) {
      router.push("/register");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Insira seu e-mail"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            placeholder="Insira sua senha"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p onClick={handleClick}>Criar nova conta!</p>
    </div>
  );
};

export default LoginForm;
