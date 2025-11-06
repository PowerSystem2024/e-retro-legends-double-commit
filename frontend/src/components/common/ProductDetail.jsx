import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import Button from '../../components/common/Button';
import { useProducts } from '../../contexts/ProductContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { getProductById, loading } = useProducts();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // Datos de ejemplo - en producción vendrían del backend
  // const products = {
  //   1: {
  //     id: 1,
  //     name: "Camiseta Retro Brasil 1970 - Pelé #10",
  //     price: 38900.99,
  //     originalPrice: 45000.00,
  //     images: [null, null, null],
  //     description: "Camiseta oficial de la selección brasileña de 1970, año del tricampeonato mundial. Réplica auténtica con el número 10 de Pelé en la espalda.",
  //     condition: "Nuevo",
  //     shipping: "free",
  //     category: "Fútbol",
  //     seller: "Retro Sports Collection",
  //     stock: 5,
  //     specifications: {
  //       "Talla": "M, L, XL",
  //       "Material": "Algodón 100%",
  //       "Color": "Amarillo/Verde",
  //       "Año": "1970"
  //     }
  //   },
  //   // ... resto de productos
  // };

  // const product = products[id]; // Usar datos de ejemplo
  const product = getProductById(id); // Usar contexto de productos

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-xl">Cargando producto...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-100 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Producto no encontrado</h2>
          <Link to="/">
            <Button variant="primary">Volver a la tienda</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="text-sm mb-6">
          <Link to="/" className="text-blue-600 hover:underline">Inicio</Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link to="/products" className="text-blue-600 hover:underline">Productos</Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-600">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Galería de imágenes */}
          <div className="space-y-4">
            <div className="w-full aspect-square bg-gray-200 border-2 border-gray-400 flex items-center justify-center">
              {product.images ? (
                <img 
                  src={product.images} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-gray-400 text-9xl">📦</div>
              )}
            </div>
            
            {Array.isArray(product.images) && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square bg-gray-200 border-2 ${
                      selectedImage === index ? 'border-blue-600' : 'border-gray-400'
                    } hover:border-blue-400 transition flex items-center justify-center`}
                  >
                    {img ? (
                      <img src={img} alt={`Vista ${index + 1}`} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-2xl">📦</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Información del producto */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-sm text-gray-600">Vendedor:</span>
                <span className="text-sm font-semibold text-blue-600">{product.seller}</span>
              </div>
            </div>

            {/* Precio */}
            <div className="bg-white border-2 border-gray-400 p-6">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-4xl font-bold text-green-700">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-gray-500 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                    <span className="bg-red-500 text-white text-sm font-bold px-2 py-1">
                      {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                    </span>
                  </>
                )}
              </div>
              <p className="text-sm text-gray-600">
                {product.shipping === 'free' ? (
                  <span className="text-green-600 font-semibold">✓ Envío gratis</span>
                ) : (
                  `Envío: $${product.shipping}`
                )}
              </p>
            </div>

            {/* Selector de cantidad */}
            <div className="bg-white border-2 border-gray-400 p-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Cantidad:
              </label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border-2 border-gray-400">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-gray-200 font-bold text-xl"
                  >
                    -
                  </button>
                  <span className="px-6 py-2 border-x-2 border-gray-400 font-bold min-w-[60px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="px-4 py-2 hover:bg-gray-200 font-bold text-xl"
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-gray-600">
                  (Máximo: {product.stock})
                </span>
              </div>
            </div>

            {/* Botones */}
            <div className="space-y-3">
              <Button
                variant="primary"
                size="large"
                className="w-full"
                onClick={handleAddToCart}
              >
                🛒 Agregar al Carrito
              </Button>
              <Button
                variant="success"
                size="large"
                className="w-full"
                onClick={handleBuyNow}
              >
                Comprar Ahora
              </Button>
            </div>
          </div>
        </div>

        {/* Descripción */}
        <div className="bg-white border-2 border-gray-400 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Descripción</h3>
          <p className="text-gray-700 mb-6">{product.description}</p> 

          {/* Especificaciones */}
          <h3 className="text-xl font-bold text-gray-900 mb-4">Especificaciones</h3>
          {product.specifications ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="flex border-b border-gray-200 py-2">
                <span className="font-semibold text-gray-700 w-1/3">{key}:</span>
                <span className="text-gray-600 w-2/3">{value}</span>
              </div>
            ))}
            </div>
            ) : (
              <p className="text-gray-600">Este producto no tiene especificaciones registradas.</p>
          )}
          
          {/* Categoría */}
          <h3 className="text-xl font-bold text-gray-900 mb-4 mt-4">Categoria del Producto</h3>
          <p className="text-gray-600 mb-6">{product.category}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;