import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { Loader2 } from "lucide-react"

export const Checkout = () => {
  const { cartItems, getCartTotal, clearCart, handlePayment, loadingPayment } =  useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    // Shipping Info
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "Argentina",
    // Payment Info
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Review

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateShipping = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "Requerido";
    if (!formData.lastName.trim()) newErrors.lastName = "Requerido";
    if (!formData.email.trim()) newErrors.email = "Requerido";
    if (!formData.phone.trim()) newErrors.phone = "Requerido";
    if (!formData.address.trim()) newErrors.address = "Requerido";
    if (!formData.city.trim()) newErrors.city = "Requerido";
    if (!formData.state.trim()) newErrors.state = "Requerido";
    if (!formData.zipCode.trim()) newErrors.zipCode = "Requerido";
    return newErrors;
  };

  const validatePayment = () => {
    const newErrors = {};
    if (!formData.cardNumber.trim()) newErrors.cardNumber = "Requerido";
    if (!formData.cardName.trim()) newErrors.cardName = "Requerido";
    if (!formData.expiryDate.trim()) newErrors.expiryDate = "Requerido";
    if (!formData.cvv.trim()) newErrors.cvv = "Requerido";
    return newErrors;
  };

  const handleNextStep = () => {
    if (step === 1) {
      const newErrors = validateShipping();
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
      setStep(2);
    } else if (step === 2) {
      const newErrors = validatePayment();
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
      setStep(3);
    }
  };

  const handlePlaceOrder = () => {
    // Simulación de procesamiento de pedido
    clearCart();
    navigate("/order-confirmation", {
      state: {
        orderNumber: Math.floor(Math.random() * 1000000),
        total: (getCartTotal() * 1.1).toFixed(2),
      },
    });
  };

  if (cartItems.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-blue-900 mb-6">
          Finalizar Compra
        </h1>

        {/* Progress Steps */}
        <div className="bg-white border-2 border-gray-400 p-6 mb-6">
          <div className="flex justify-between items-center">
            <div
              className={`flex-1 text-center ${
                step >= 1 ? "text-blue-600" : "text-gray-400"
              }`}
            >
              <div
                className={`w-10 h-10 mx-auto rounded-full border-2 ${
                  step >= 1
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "border-gray-400"
                } flex items-center justify-center font-bold mb-2`}
              >
                1
              </div>
              <p className="text-sm font-bold">Envío</p>
            </div>
            <div
              className={`flex-1 h-1 ${
                step >= 2 ? "bg-blue-600" : "bg-gray-400"
              }`}
            ></div>
            <div
              className={`flex-1 text-center ${
                step >= 2 ? "text-blue-600" : "text-gray-400"
              }`}
            >
              <div
                className={`w-10 h-10 mx-auto rounded-full border-2 ${
                  step >= 2
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "border-gray-400"
                } flex items-center justify-center font-bold mb-2`}
              >
                2
              </div>
              <p className="text-sm font-bold">Pago</p>
            </div>
            <div
              className={`flex-1 h-1 ${
                step >= 3 ? "bg-blue-600" : "bg-gray-400"
              }`}
            ></div>
            <div
              className={`flex-1 text-center ${
                step >= 3 ? "text-blue-600" : "text-gray-400"
              }`}
            >
              <div
                className={`w-10 h-10 mx-auto rounded-full border-2 ${
                  step >= 3
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "border-gray-400"
                } flex items-center justify-center font-bold mb-2`}
              >
                3
              </div>
              <p className="text-sm font-bold">Revisar</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-white border-2 border-gray-400 p-6">
              {/* Step 1: Shipping */}
              {step === 1 && (
                <div>
                  <h2 className="text-xl font-bold text-blue-900 mb-4">
                    Información de Envío
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      name="firstName"
                      label="Nombre"
                      value={formData.firstName}
                      onChange={handleChange}
                      error={errors.firstName}
                      required
                    />
                    <Input
                      name="lastName"
                      label="Apellido"
                      value={formData.lastName}
                      onChange={handleChange}
                      error={errors.lastName}
                      required
                    />
                  </div>
                  <Input
                    type="email"
                    name="email"
                    label="Email"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    required
                  />
                  <Input
                    name="phone"
                    label="Teléfono"
                    value={formData.phone}
                    onChange={handleChange}
                    error={errors.phone}
                    required
                  />
                  <Input
                    name="address"
                    label="Dirección"
                    value={formData.address}
                    onChange={handleChange}
                    error={errors.address}
                    required
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      name="city"
                      label="Ciudad"
                      value={formData.city}
                      onChange={handleChange}
                      error={errors.city}
                      required
                    />
                    <Input
                      name="state"
                      label="Departamento"
                      value={formData.state}
                      onChange={handleChange}
                      error={errors.state}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      name="zipCode"
                      label="Código Postal"
                      value={formData.zipCode}
                      onChange={handleChange}
                      error={errors.zipCode}
                      required
                    />
                    <Input
                      name="country"
                      label="País"
                      value={formData.country}
                      onChange={handleChange}
                      disabled
                    />
                  </div>
                  <Button
                    variant="primary"
                    size="large"
                    onClick={handleNextStep}
                    className="w-full mt-4"
                  >
                    Continuar al Pago
                  </Button>
                </div>
              )}

              {/* Step 2: Payment */}
              {step === 2 && (
                <div>
                  <h2 className="text-xl font-bold text-blue-900 mb-4">
                    Pagar con Mercado Pago
                  </h2>

                  {/* Aca se crea el brick que redirecciona a pagar evitando el uso de Wallet */}
                  <div id="wallet_container" className="my-4">
                    <button onClick={handlePayment} className="w-full p-1 bg-yellow-300 border-2 border-zinc-600 cursor-pointer hover:border-blue-600 hover:brightness-105" disabled={loadingPayment}>
                    {loadingPayment ? 
                      <span className="flex gap-1.5 items-center justify-center p-2 font-semibold">
                        <Loader2 className="animate-spin"  /> Procesando..
                      </span>
                     : <span className="flex gap-1.5 items-center justify-center font-semibold">
                        Continuar con 
                        <img src="/assets/Mercado_Pago_Logo.svg" width={120} height={50} />
                     </span>}
                    </button>
                  </div>

                  <div className="flex gap-4 mt-4">
                    <Button
                      variant="secondary"
                      size="large"
                      onClick={() => setStep(1)}
                      className="flex-1"
                    >
                      Volver
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Review */}
              {step === 3 && (
                <div>
                  <h2 className="text-xl font-bold text-blue-900 mb-4">
                    Revisar Pedido
                  </h2>
                  <div className="space-y-4">
                    <div className="border-2 border-gray-300 p-4">
                      <h3 className="font-bold mb-2">Dirección de Envío</h3>
                      <p className="text-sm text-gray-700">
                        {formData.firstName} {formData.lastName}
                        <br />
                        {formData.address}
                        <br />
                        {formData.city}, {formData.state} {formData.zipCode}
                        <br />
                        {formData.country}
                      </p>
                    </div>
                    <div className="border-2 border-gray-300 p-4">
                      <h3 className="font-bold mb-2">Método de Pago</h3>
                      <p className="text-sm text-gray-700">
                        Tarjeta terminada en {formData.cardNumber.slice(-4)}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-6">
                    <Button
                      variant="secondary"
                      size="large"
                      onClick={() => setStep(2)}
                      className="flex-1"
                    >
                      Volver
                    </Button>
                    <Button
                      variant="success"
                      size="large"
                      onClick={handlePlaceOrder}
                      className="flex-1"
                    >
                      Confirmar Pedido
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border-2 border-gray-400 p-6 sticky top-4">
              <h2 className="text-xl font-bold text-blue-900 mb-4">Resumen</h2>
              <div className="space-y-2 mb-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {item.name} x{item.quantity}
                    </span>
                    <span className="font-bold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t-2 border-gray-300 pt-3 space-y-2">
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
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Impuestos:</span>
                  <span className="font-bold">
                    ${(getCartTotal() * 0.1).toFixed(2)}
                  </span>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
