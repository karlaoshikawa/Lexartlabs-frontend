"use client";
import { requestRegister, setToken } from "@/app/api";
import { useState } from "react";

const AddProductForm2 = () => {
  const [error, setError] = useState("");

  const [product, setProduct] = useState({
    name: "",
    details: {
      brand: "",
      model: "",
      color: "",
    },
    price: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleDetailsChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      details: {
        ...prevProduct.details,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const tokenStorage = localStorage.getItem("user");
      const tokenObject = JSON.parse(tokenStorage);
      const token = tokenObject.token;
      console.log("token", tokenStorage);
      setToken(token);
      await requestRegister("/products/newProduct", product, token);
    } catch (error) {
      setError("registro inválido, por favor tente novamente");
    }

    setProduct({
      name: "",
      details: {
        brand: "",
        model: "",
        color: "",
      },
      price: 0,
    });
    console.log(product);
  };

  return (
    <div>
      <h2>Adicionar Produto - Estrutura 2</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="brand">Marca:</label>
          <input
            type="text"
            id="brand"
            name="brand"
            value={product.details.brand}
            onChange={handleDetailsChange}
          />
        </div>
        <div>
          <label htmlFor="model">Modelo:</label>
          <input
            type="text"
            id="model"
            name="model"
            value={product.details.model}
            onChange={handleDetailsChange}
          />
        </div>
        <div>
          <label htmlFor="color">Cor:</label>
          <input
            type="text"
            id="color"
            name="color"
            value={product.details.color}
            onChange={handleDetailsChange}
          />
        </div>
        <div>
          <label htmlFor="price">Preço:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Adicionar Produto</button>
      </form>
    </div>
  );
};

export default AddProductForm2;
