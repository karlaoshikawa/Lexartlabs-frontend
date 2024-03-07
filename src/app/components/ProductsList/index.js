import { useState } from "react";
import EditProductForm from "@/app/components/editProductForm";
import { requestDelete, setToken} from "@/app/api";

const ProductsList = ({ productsList }) => {
  const [editingProduct, setEditingProduct] = useState(null);
  const [error, setError] = useState("");


  const handleEditProduct = (product) => {
    setEditingProduct(product);
  };

  const handleDeleteProduct = async (productId) => {
       try {
     const tokenStorage = localStorage.getItem("user");
     const tokenObject = JSON.parse(tokenStorage);
     const token = tokenObject.token;
     setToken(token);
     await requestDelete(
       `/products/productDelete/${productId}`,
       token
     );
     window.location.reload();
   } catch (error) {
     setError("registro inválido, por favor tente novamente");
   }

  };

  return (
    <div>
      <h1>PRODUTOS</h1>
      <div>
        {productsList.map((product) => (
          <div key={product.id}>
            <h3>{product.name}</h3>
            <p>Marca: {product.brand}</p>
            <p>Modelo: {product.model}</p>
            <p>Cor: {product.color}</p>
            <p>Preço: {product.price}</p>
            <button onClick={() => handleEditProduct(product)}>
              Editar Produto
            </button>
            <button onClick={() => handleDeleteProduct(product.id)}>
              Excluir Produto
            </button>
            {editingProduct && editingProduct.id === product.id && (
              <div>
                <EditProductForm product={editingProduct} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
