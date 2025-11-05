import React, { createContext, useState, useContext, useEffect } from 'react';

const ProductContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useProducts = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProducts debe ser usado dentro de un ProductProvider');
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
        const response = await fetch('http://localhost:5000/api/products/products', {
            method: 'GET',
            credentials: 'include',
        });
        
        if (!response.ok) {
            throw new Error('Error al cargar productos');
        }
        
        const data = await response.json();
        setProducts(data);
        setError(null);
        } catch (err) {
        setError(err.message);
        console.error('Error fetching products:', err);
        } finally {
        setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const getProductById = (id) => {
        return products.find(product => product.id === (id));
    };

    const value = {
    products,
    loading,
    error,
    fetchProducts,
    getProductById
    };

    return (
        <ProductContext.Provider value={value}>
        {children}
        </ProductContext.Provider>
    );
};