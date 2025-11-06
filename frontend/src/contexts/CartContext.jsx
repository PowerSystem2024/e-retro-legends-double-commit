import React, { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();

// helper: detecta campo de stock posible en product
// eslint-disable-next-line react-refresh/only-export-components
export const getStockFromProduct = (p) => {
  if (!p) return null;
  const keys = ["stock", "quantityAvailable", "inventory", "stockQty", "qty", "available"];
  for (const k of keys) {
    if (Object.prototype.hasOwnProperty.call(p, k)) {
      const v = p[k];
      if (typeof v === "number" && Number.isFinite(v)) return v;
      if (typeof v === "string" && v !== "") {
        const n = Number(v);
        if (!Number.isNaN(n)) return n;
      }
    }
  }
  return null;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe ser usado dentro de un CartProvider");
  }
  const {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount,
  } = context;
  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount,
  };
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Cargar carrito desde localStorage
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    // Guardar carrito en localStorage cuando cambie
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    // Protege contra llamadas sin product (evita el error product.id)
    if (!product || !product.id) {
      console.warn("addToCart: product inválido", product);
      return false;
    }

    const stock = getStockFromProduct(product);

    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      const existingQty = existingItem ? existingItem.quantity : 0;

      // Si stock está definido, bloquea si supera
      if (typeof stock === "number" && existingQty + quantity > stock) {
        console.warn("addToCart: excede stock disponible", {
          productId: product.id,
          requested: existingQty + quantity,
          stock,
        });
        // no modificar el estado
        return prevItems;
      }

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prevItems, { ...product, quantity }];
    });

    // Devuelve true si la operación parece permitida (si stock definido,
    // la comprobación anterior evitó la adición cuando excedía)
    // Como setCartItems es asíncrono devolvemos true si no hay stock conflict
    const existing = cartItems.find((it) => it.id === product.id);
    const existingQtyNow = existing ? existing.quantity : 0;
    if (typeof stock === "number" && existingQtyNow + quantity > stock) {
      return false;
    }
    return true;
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  const updateQuantity = (productId, quantity) => {
    // si piden 0 o menos, eliminar
    if (quantity <= 0) {
      removeFromCart(productId);
      return true;
    }

    let blocked = false;

    setCartItems((prevItems) => {
      const item = prevItems.find((it) => it.id === productId);
      if (!item) return prevItems;

      const stock = getStockFromProduct(item);
      if (typeof stock === "number" && quantity > stock) {
        // no actualizar si excede stock
        console.warn("updateQuantity: excede stock", { productId, requested: quantity, stock });
        blocked = true;
        return prevItems;
      }

      return prevItems.map((it) => (it.id === productId ? { ...it, quantity } : it));
    });

    return !blocked;
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const getCartItemsCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
