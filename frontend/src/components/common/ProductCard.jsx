// import React, { use } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { showDialog } from "./Dialog";

export const ProductCard = ({ product }) => {
  const { addToCart, cartItems } = useCart();

  // mismo helper local para detectar stock
  const getStockFromProduct = (p) => {
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

  const currentCartItem = cartItems.find((it) => it.id === product.id);
  const currentQty = currentCartItem ? currentCartItem.quantity : 0;
  const stock = getStockFromProduct(product);
  const isSoldOut = typeof stock === "number" && stock <= 0;
  const cannotAddMore = typeof stock === "number" && currentQty >= stock;

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isSoldOut || cannotAddMore) {
      showDialog({ content: <div className="p-3">No hay suficiente stock disponible</div> })
      return;
    }
    const ok = addToCart(product, 1);
    if (!ok) {
     showDialog({ content: <div className="p-3">No se pudo agregar no hay stock suficiente.</div> })
    }
  };

  return (
    <div className="border-2 border-gray-400 bg-white hover:shadow-lg transition-shadow duration-200 h-full flex flex-col justify-between">
      <Link to={`/product/${product.id}`} className="flex-1 block">
        <div className="w-full aspect-square bg-gray-200 flex items-center justify-center overflow-hidden">
          {product.images ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-gray-400 text-4xl">📦</div>
          )}
        </div>
        <div className="p-3">
          <h3 className="font-bold text-sm text-blue-600 hover:underline mb-1 line-clamp-2">
            {product.name}
          </h3>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-lg font-bold text-green-700">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          {product.shipping && (
            <p className="text-xs text-gray-600">
              {product.shipping === "free"
                ? "🚚 Envío gratis"
                : `Envío: $${product.shipping}`}
            </p>
          )}
          {product.condition && (
            <p className="text-xs text-gray-600 mt-1">
              Condición:{" "}
              <span className="font-semibold">{product.condition === "new" ? "nuevo" : "usado"}</span>
            </p>
          )}
        </div>
      </Link>
      <div className="p-3 pt-0">
        <button
          onClick={handleAdd}
          disabled={isSoldOut || cannotAddMore}
          className={`w-full text-white text-sm font-semibold py-2 px-3 cursor-pointer transition ${
            isSoldOut || cannotAddMore
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          aria-label={`Agregar " ${product.name} " al carrito`}
          title={
            isSoldOut
              ? "Agotado"
              : cannotAddMore
              ? `Máximo ${stock} en stock`
              : `Agregar "${product.name}" al carrito`
          }
        >
          {isSoldOut ? "Agotado" : cannotAddMore ? `Máximo (${stock})` : "Agregar al carrito"}
        </button>
      </div>
    </div>
  );
};
