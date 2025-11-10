import React, { createContext, useState, useContext, useEffect } from "react";
import { showDialog } from "../components/common/Dialog";

const ProductContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts debe ser usado dentro de un ProductProvider");
  }
  const {
    products,
    loading,
    error,
    fetchProducts,
    getProductById,
    createNewProduct,
    updateProduct,
    getProductByUserId,
    deleteProduct
  } = context;
  return {
    products,
    loading,
    error,
    fetchProducts,
    getProductById,
    createNewProduct,
    updateProduct,
    getProductByUserId,
    deleteProduct
  };
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

  const getProductByUserId = async (user_id) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACK_API_URL}/api/product/${user_id}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const product = await response.json();

      if (!response.ok) throw new Error(product.message);

      setProducts(product);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const createNewProduct = async (newProduct) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACK_API_URL}/api/product`,
        {
          method: "POST",
          credentials: "include",
          body: JSON.stringify(newProduct),
        }
      );
      const product = await response.json();

      if (!response.ok) throw new Error(product.message);

      setProducts(product);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (productId) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACK_API_URL}/api/product/${productId}`
      );
      const product = await response.json();

      if (!response.ok) throw new Error(product.message);
      showDialog({ content: <div>{product.message}</div> })
      setProducts(product);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (productId) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACK_API_URL}/api/product/${productId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const product = await response.json();

      if (!response.ok) throw new Error(product.message);
      showDialog({ content: <div>{product.message}</div> })

      setProducts(product);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
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
    deleteProduct,
    getProductByUserId,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
