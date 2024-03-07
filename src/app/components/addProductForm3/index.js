"use client";
import { requestRegister, setToken } from "@/app/api";
import { useState } from "react";

const AddProductForm3 = () => {
  const [error, setError] = useState("");
  const [products, setProducts] = useState([
    {
      name: "",
      brand: "",
      model: "",
      data: [{ price: 0, color: "" }],
    },
  ]);

  const handleInputChange = (e, index, dataIndex) => {
    const { name, value } = e.target;
    const updatedProducts = [...products];
    if (dataIndex !== undefined) {
      updatedProducts[index].data[dataIndex][name] = value;
    } else {
      
      updatedProducts[index][name] = value;
    }
    setProducts(updatedProducts);
  };

  const addData = (index) => {
    const updatedProducts = [...products];
    updatedProducts[index].data.push({ price: 0, color: "" });
    setProducts(updatedProducts);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const tokenStorage = localStorage.getItem("user");
      const tokenObject = JSON.parse(tokenStorage);
      const token = tokenObject.token;
      setToken(token);
      await requestRegister("/products/newProduct", products, token);
    } catch (error) {
      setError("registro inválido, por favor tente novamente");
    }

    setProducts([
      {
        name: "",
        brand: "",
        model: "",
        data: [{ price: 0, color: "" }],
      },
    ]);
  };

  return (
    <div>
      <h2>Adicionar Produtos Estrutura 3</h2>
      <form onSubmit={handleSubmit}>
        {products.map((product, index) => (
          <div key={index}>
            <h3>Produto {index + 1}</h3>
            <div>
              <label htmlFor={`name-${index}`}>Nome:</label>
              <input
                type="text"
                id={`name-${index}`}
                name="name"
                value={product.name}
                onChange={(e) => handleInputChange(e, index)}
              />
            </div>
            <div>
              <label htmlFor={`brand-${index}`}>Marca:</label>
              <input
                type="text"
                id={`brand-${index}`}
                name="brand"
                value={product.brand}
                onChange={(e) => handleInputChange(e, index)}
              />
            </div>
            <div>
              <label htmlFor={`model-${index}`}>Modelo:</label>
              <input
                type="text"
                id={`model-${index}`}
                name="model"
                value={product.model}
                onChange={(e) => handleInputChange(e, index)}
              />
            </div>
            {product.data.map((data, dataIndex) => (
              <div key={dataIndex}>
                <h4>Dados {dataIndex + 1}</h4>
                <div>
                  <label htmlFor={`price-${index}-${dataIndex}`}>Preço:</label>
                  <input
                    type="number"
                    id={`price-${index}-${dataIndex}`}
                    name="price"
                    value={data.price}
                    onChange={(e) => handleInputChange(e, index, dataIndex)}
                  />
                </div>
                <div>
                  <label htmlFor={`color-${index}-${dataIndex}`}>Cor:</label>
                  <input
                    type="text"
                    id={`color-${index}-${dataIndex}`}
                    name="color"
                    value={data.color}
                    onChange={(e) => handleInputChange(e, index, dataIndex)} 
                  />
                </div>
              </div>
            ))}
            <button type="button" onClick={() => addData(index)}>
              Adicionar Dados
            </button>
          </div>
        ))}
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default AddProductForm3;
