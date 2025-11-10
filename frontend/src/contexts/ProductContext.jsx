import React, { createContext, useState, useContext, useEffect } from "react";

const ProductContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts debe ser usado dentro de un ProductProvider");
  }
  return context;
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_BACK_API_URL}/api/products`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Error al cargar productos");
      }

      const data = await response.json();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const getProductById = (id) => {
    return products.find((product) => product.id === id);
  };

  const createNewProduct = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACK_API_URL}/product`
      );
      const product = await response.json();

      if (!response.ok) throw new Error(product.message);

      setLoading(false);
      setProducts(product);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const updateProduct = async (productId) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACK_API_URL}/product/${productId}`
      );
      const product = await response.json();

      if (!response.ok) throw new Error(product.message);

      setLoading(false);
      setProducts(product);
    } catch (error) {
      setError(error);
    }
  };

  const value = {
    products,
    loading,
    error,
    fetchProducts,
    getProductById,
    createNewProduct,
    updateProduct,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
