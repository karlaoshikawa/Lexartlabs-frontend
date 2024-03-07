"use client";
import { useRouter } from "next/navigation";
import styles from "../page.module.css";
import ProductsList from "../components/ProductsList";
import { useEffect, useState } from "react";
import { requestData, setToken } from "../api";
import ProductLinks from "../components/linksList";

export default function Products() {
  const [isLogged, setIsLogged] = useState(false);
  const [productsList, setProductsList] = useState([]);
  const [error, setError] = useState("");

  const router = useRouter();

  useEffect(() => {
    const tokenStorage = localStorage.getItem("user");
    const tokenObject = JSON.parse(tokenStorage);
    const token = tokenObject.token;
    setToken(token);
    requestData("/products/productsList", token).then((res) => {
      console.log(res.products);

      setProductsList(res.products);
      console.log(productsList);
    });

    setIsLogged(!!token);
    if (!token) {
      router.push("/login");
    }
  }, [router, productsList]);

  // useEffect(() => {
  //   try {
  //     const token = localStorage.getItem("user");
  //     //localStorage.setItem("products", JSON.stringify(response));
  //     setToken(token);
  //     console.log(token);
  //     //const response = requestData("/products/productsList");
  //     //setProductsList(response)
  //     // if (response && response.token) {
  //     //   router.push("/products");
  //     // }
  //   } catch (error) {
  //     setError("Email ou senha incorretos");
  //   }
  // }, []);

  return (
    <div className={styles.main}>
      <ProductLinks/>
      {isLogged && <ProductsList productsList={productsList} />}
    </div>
  );
}
