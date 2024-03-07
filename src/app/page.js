"use client"; 
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import LoginForm from "./components/LoginForm";

export default function Home() {
  const [isLogged, setIsLogged] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("user");
    setIsLogged(!!token);
    if (!!token) {
      router.push("/products");
    }
  }, [router]); 

  return <main className={styles.main}>{!isLogged && <LoginForm />}</main>;
}
