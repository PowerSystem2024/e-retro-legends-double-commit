import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";


export const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    role: "buyer", // Valor por defecto
  });
  const [errors, setErrors] = useState({});
  const { register, isLoading} = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es requerido";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "El apellido es requerido";
    }

    if (!formData.email) {
      newErrors.email = "El email es requerido";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }

    if (!formData.password) {
      newErrors.password = "La contraseña es requerida";
    } else if (formData.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "Debes aceptar los términos y condiciones";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    await register({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });

    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-md mx-auto px-4">
        <div className="bg-white border-2 border-gray-400 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-blue-900 mb-2">
              Crear Cuenta
            </h1>
            <p className="text-sm text-gray-600">
              Únete a la comunidad de e-Retro Legends
            </p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="text"
                name="name"
                label="Nombre"
                placeholder="Jhon"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                required
              />

              <Input
                type="text"
                name="lastName"
                label="Apellido"
                placeholder="Rambo"
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
              placeholder="tu@email.com"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              required
            />

            <Input
              type="password"
              name="password"
              label="Contraseña"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              required
            />

            {/* Tipo de cuenta */}
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2 text-gray-700">
                Tipo de cuenta <span className="text-red-600">*</span>
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="role"
                    value="buyer"
                    checked={formData.role === "buyer"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span className="text-sm">
                    🛒 Comprador - Quiero comprar productos
                  </span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="role"
                    value="seller"
                    checked={formData.role === "seller"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span className="text-sm">
                    💼 Vendedor - Quiero vender productos
                  </span>
                </label>
              </div>
            </div>

            {/* Términos y condiciones */}
            <div className="mb-6">
              <label className="flex justify-center items-center">
                <input
                  type="checkbox"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleChange}
                  className="mr-2 mt-1"
                />
                <span className="text-xs text-gray-700 mt-1.5">
                  Acepto los{" "}
                  <Link to="/terms" className="text-blue-600 hover:underline">
                    términos y condiciones
                  </Link>{" "}
                  y la{" "}
                  <Link to="/privacy" className="text-blue-600 hover:underline">
                    política de privacidad
                  </Link>
                </span>
              </label>
              {errors.acceptTerms && (
                <p className="text-red-600 text-xs mt-1">
                  {errors.acceptTerms}
                </p>
              )}
            </div>

            <Button
              onClick={() => register(formData)}
              type="submit"
              variant="primary"
              size="large"
              className="w-full mb-4"
            >
              {isLoading ? 
                <span className="flex gap-1.5 items-center justify-center">
                  <Loader2 size={20} className="animate-spin" />
                  Creando
                </span>
              : "Crear Cuenta"}
            </Button>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                ¿Ya tienes una cuenta?{" "}
                <Link
                  to="/login"
                  className="text-blue-600 hover:underline font-bold"
                >
                  Inicia sesión aquí
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
