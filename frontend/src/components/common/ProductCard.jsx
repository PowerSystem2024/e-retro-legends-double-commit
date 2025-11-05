// import React, { use } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";

export const ProductCard = ({ product, onAddToCart }) => {
  const { addToCart } = useCart();

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Si el padre pasa onAddToCart, se usa; si no, usamos addToCart del contexto
    const fn = typeof onAddToCart === "function" ? onAddToCart : addToCart;
    fn(product);
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
              <span className="font-semibold">{product.condition}</span>
            </p>
          )}
        </div>
        </Link>
      <div className="p-3 pt-0">
        <button
          onClick={handleAdd}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 px-3 rounded cursor-pointer transition"
          aria-label={`Agregar " ${product.name} " al carrito`}
          title={`Agregar "${product.name}" al carrito`}
          >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
};
