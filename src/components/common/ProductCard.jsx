import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="border-2 border-gray-400 bg-white hover:shadow-lg transition-shadow duration-200">
      <Link to={`/product/${product.id}`}>
        <div className="aspect-square bg-gray-200 flex items-center justify-center overflow-hidden">
          {product.image ? (
            <img 
              src={product.image} 
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
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          {product.shipping && (
            <p className="text-xs text-gray-600">
              {product.shipping === 'free' ? '🚚 Envío gratis' : `Envío: $${product.shipping}`}
            </p>
          )}
          {product.condition && (
            <p className="text-xs text-gray-600 mt-1">
              Condición: <span className="font-semibold">{product.condition}</span>
            </p>
          )}
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;

