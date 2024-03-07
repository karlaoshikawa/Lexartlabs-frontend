"use client";
import { requestUpdate, setToken } from "@/app/api";
import { useState } from "react";

const EditProductForm = ({ product }) => {
  const [editedProduct, setEditedProduct] = useState({
    id: product.id,
    name: product.name,
    brand: product.brand,
    model: product.model,
    price: product.price,
    color: product.color,
  });

  const id = product.id
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

 const handleSubmit = async (e) => {
   e.preventDefault();
   try {
     const tokenStorage = localStorage.getItem("user");
     const tokenObject = JSON.parse(tokenStorage);
     const token = tokenObject.token;
     console.log(editedProduct);
     setToken(token);
     await requestUpdate(`/products/productUpdate/${id}`, editedProduct, token);
     window.location.reload();
   } catch (error) {
     setError("registro inválido, por favor tente novamente");
   }

 };


  return (
    <div>
      <h2>Editar Produto</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={editedProduct.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="brand">Marca:</label>
          <input
            type="text"
            id="brand"
            name="brand"
            value={editedProduct.brand}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="model">Modelo:</label>
          <input
            type="text"
            id="model"
            name="model"
            value={editedProduct.model}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="price">Preço:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={editedProduct.price}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="color">Cor:</label>
          <input
            type="text"
            id="color"
            name="color"
            value={editedProduct.color}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
};

export default EditProductForm;
