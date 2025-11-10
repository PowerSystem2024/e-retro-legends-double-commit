import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart, getStockFromProduct } from "../../contexts/CartContext";
import Button from "../../components/common/Button";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      navigate("/checkout");
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white border-2 border-gray-400 p-12 text-center">
            <div className="text-6xl mb-4 flex justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="33"
                height="33"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-shopping-cart-icon lucide-shopping-cart"
              >
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Tu carrito está vacío
            </h2>
            <p className="text-gray-600 mb-6">
              ¡Explora nuestros productos deportivos retro y encuentra tus
              favoritos!
            </p>
            <Link to="/">
              <Button variant="primary" size="large">
                Ir a la tienda
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-blue-900 mb-6">
          Carrito de Compras
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white border-2 border-gray-400">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="border-b-2 border-gray-300 p-4 last:border-b-0"
                >
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="w-24 h-24 bg-gray-200 flex-shrink-0 border-2 border-gray-400 flex items-center justify-center">
                      {item.images ? (
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-3xl">📦</span>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="flex-1">
                      <Link
                        to={`/product/${item.id}`}
                        className="text-blue-600 hover:underline font-bold mb-1 block"
                      >
                        {item.name}
                      </Link>
                      <p className="text-sm text-gray-600 mb-2">
                        Condición: {item.condition || "N/A"}
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center border-2 border-gray-400">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-3 py-1 hover:bg-gray-200 font-bold"
                          >
                            -
                          </button>
                          <span className="px-4 py-1 border-x-2 border-gray-400 font-bold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => {
                              const stock = getStockFromProduct(item);
                              if (typeof stock === "number" && item.quantity + 1 > stock) {
                                // feedback simple (puedes reemplazar por toast)
                                alert("No hay suficiente stock disponible");
                                return;
                              }
                              updateQuantity(item.id, item.quantity + 1);
                            }}
                            className={`px-3 py-1 hover:bg-gray-200 font-bold ${ (typeof getStockFromProduct(item) === "number" && item.quantity >= getStockFromProduct(item)) ? "opacity-60 cursor-not-allowed" : "" }`}
                            aria-disabled={typeof getStockFromProduct(item) === "number" && item.quantity >= getStockFromProduct(item)}
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-600 hover:underline text-sm font-bold"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <p className="text-xl font-bold text-green-700">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <p className="text-xs text-gray-600">
                        ${item.price} c/u
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border-2 border-gray-400 p-6 sticky top-4">
              <h2 className="text-xl font-bold text-blue-900 mb-4">
                Resumen del Pedido
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-bold">
                    ${getCartTotal().toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Envío:</span>
                  <span className="font-bold text-green-600">GRATIS</span>
                </div>
                <div className="border-t-2 border-gray-400 pt-3">
                  <div className="flex justify-between">
                    <span className="font-bold text-lg">Total:</span>
                    <span className="font-bold text-2xl text-green-700">
                      ${(getCartTotal() * 1.1).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <Button
                variant="success"
                size="large"
                className="w-full mb-3"
                onClick={handleCheckout}
              >
                Proceder al Pago
              </Button>

              <Link to="/">
                <Button variant="outline" size="medium" className="w-full">
                  Seguir Comprando
                </Button>
              </Link>

              <div className="mt-6 p-4 bg-blue-50 border-2 border-blue-300">
                <p className="text-xs text-gray-700">
                  <strong>🔒 Compra Segura</strong>
                  <br />
                  Tus datos están protegidos con encriptación SSL
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
