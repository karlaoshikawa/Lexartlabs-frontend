"use client";

import LoginForm from "@/app/components/LoginForm";
import RegisterForm from "@/app/components/RegisterForm";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [isUser, setIsUser] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("user");
    setIsLogged(!!token);
  }, []);

  const handleClick = () => {
    setIsUser(!isUser);
  };

  return (
    <div>
      {isLogged === false ? (
        <div>
          {isUser ? (
            <div>
              <LoginForm />
              <p onClick={handleClick}>Criar nova conta!</p>
            </div>
          ) : (
            <div>
              <RegisterForm />
              <p onClick={handleClick}>Já sou cadastrado!</p>
            </div>
          )}
        </div>
      ) : (
        "produtos"
      )}
    </div>
  );
};

export default HomePage;
