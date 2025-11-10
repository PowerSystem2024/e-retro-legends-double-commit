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
  // const [selectedImage, setSelectedImage] = useState(0); solo se usa si hay galería de imágenes

  const product = getProductById(id);

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

  // stock seguro
  const stockValue = Number(product.stock) || 0;

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
              {product.image ? (
                <img 
                  // src={Array.isArray(product.image) ? product.image[selectedImage] : product.image} 
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-gray-400 text-9xl">📦</div>
              )}
            </div>
            
            {/* si en la base de datos images es un array con varias imágenes */}
            {/* {Array.isArray(product.images) && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square bg-gray-200 border-2 ${selectedImage === index ? 'border-blue-600' : 'border-gray-400'} hover:border-blue-400 transition flex items-center justify-center`}
                  >
                    {img ? (
                      <img src={img} alt={`Vista ${index + 1}`} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-2xl">📦</span>
                    )}
                  </button>
                ))}
              </div>
            )} */}
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
                      ${Number(product.originalPrice).toFixed(2)}
                    </span>

                  </>
                )}
              </div>
              <p className="text-sm text-gray-600">
                {product.price > 45000 ? (
                  <span className="text-green-600 font-semibold">✓ Envío gratis</span>
                ) : (
                  <span>Envíos desde $5000</span>
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
                    onClick={() => setQuantity(Math.min(stockValue || quantity + 1, quantity + 1))}
                    className="px-4 py-2 hover:bg-gray-200 font-bold text-xl"
                    disabled={stockValue > 0 && quantity >= stockValue}
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-gray-600">
                  (Máximo: {stockValue})
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

          {product.brand || product.year || product.size || product.color ? (
            <table className="w-full border border-gray-200 rounded-md text-left">
              <tbody>
                {product.brand && (
                  <tr className="border-b border-gray-200">
                    <th className="px-3 py-2 font-semibold text-gray-700 w-1/3">Marca:</th>
                    <td className="px-3 py-2 text-gray-600">{product.brand}</td>
                  </tr>
                )}
                {product.year && (
                  <tr className="border-b border-gray-200">
                    <th className="px-3 py-2 font-semibold text-gray-700 w-1/3">Año:</th>
                    <td className="px-3 py-2 text-gray-600">{product.year}</td>
                  </tr>
                )}
                {product.size && (
                  <tr className="border-b border-gray-200">
                    <th className="px-3 py-2 font-semibold text-gray-700 w-1/3">Talle:</th>
                    <td className="px-3 py-2 text-gray-600">{product.size}</td>
                  </tr>
                )}
                {product.color && (
                  <tr>
                    <th className="px-3 py-2 font-semibold text-gray-700 w-1/3">Color:</th>
                    <td className="px-3 py-2 text-gray-600">{product.color}</td>
                  </tr>
                )}
              </tbody>
            </table>
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