import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'futbol',
    price: '',
    originalPrice: '',
    stock: '',
    condition: 'nuevo',
    shipping: 'free',
    brand: '',
    year: '',
    size: '',
    color: ''
  });

  const [errors, setErrors] = useState({});

  const categories = [
    { value: 'futbol', label: 'Fútbol' },
    { value: 'basketball', label: 'Basketball' },
    { value: 'tenis', label: 'Tenis' },
    { value: 'baseball', label: 'Baseball' },
    { value: 'otros', label: 'Otros Deportes' }
  ];

  const conditions = [
    { value: 'nuevo', label: 'Nuevo' },
    { value: 'usado-excelente', label: 'Usado - Excelente' },
    { value: 'usado-muy-bueno', label: 'Usado - Muy Bueno' },
    { value: 'usado-bueno', label: 'Usado - Bueno' },
    { value: 'replica', label: 'Réplica' },
    { value: 'coleccionable', label: 'Coleccionable' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre del producto es requerido';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'La descripción es requerida';
    }
    
    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = 'El precio debe ser mayor a 0';
    }
    
    if (!formData.stock || parseInt(formData.stock) < 0) {
      newErrors.stock = 'El stock debe ser 0 o mayor';
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Simulación de guardado - en producción esto haría una llamada al backend
    console.log('Producto guardado:', formData);
    navigate('/seller/products');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-blue-900">
            {isEditing ? 'Editar Producto' : 'Nuevo Producto'}
          </h1>
          <p className="text-gray-600">
            {isEditing ? 'Actualiza la información del producto' : 'Añade un nuevo producto a tu inventario'}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bg-white border-2 border-gray-400 p-6 mb-6">
            <h2 className="text-xl font-bold text-blue-900 mb-4">Información Básica</h2>
            
            <Input
              name="name"
              label="Nombre del Producto"
              placeholder="Ej: Camiseta Retro Brasil 1970 - Pelé #10"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              required
            />

            <div className="mb-4">
              <label className="block text-sm font-bold mb-2 text-gray-700">
                Descripción <span className="text-red-600">*</span>
              </label>
              <textarea
                name="description"
                placeholder="Describe el producto en detalle..."
                value={formData.description}
                onChange={handleChange}
                rows="5"
                className={`w-full px-3 py-2 border-2 border-gray-400 focus:border-blue-600 focus:outline-none transition-colors ${errors.description ? 'border-red-600' : ''}`}
              />
              {errors.description && (
                <p className="text-red-600 text-xs mt-1">{errors.description}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2 text-gray-700">
                  Categoría <span className="text-red-600">*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-gray-400 focus:border-blue-600 focus:outline-none"
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-bold mb-2 text-gray-700">
                  Condición <span className="text-red-600">*</span>
                </label>
                <select
                  name="condition"
                  value={formData.condition}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-gray-400 focus:border-blue-600 focus:outline-none"
                >
                  {conditions.map(cond => (
                    <option key={cond.value} value={cond.value}>{cond.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white border-2 border-gray-400 p-6 mb-6">
            <h2 className="text-xl font-bold text-blue-900 mb-4">Precio e Inventario</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="number"
                name="price"
                label="Precio"
                placeholder="0.00"
                value={formData.price}
                onChange={handleChange}
                error={errors.price}
                required
              />

              <Input
                type="number"
                name="originalPrice"
                label="Precio Original (opcional)"
                placeholder="0.00"
                value={formData.originalPrice}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                type="number"
                name="stock"
                label="Stock Disponible"
                placeholder="0"
                value={formData.stock}
                onChange={handleChange}
                error={errors.stock}
                required
              />

              <div className="mb-4">
                <label className="block text-sm font-bold mb-2 text-gray-700">
                  Envío
                </label>
                <select
                  name="shipping"
                  value={formData.shipping}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-gray-400 focus:border-blue-600 focus:outline-none"
                >
                  <option value="free">Envío Gratis</option>
                  <option value="5">$5.00</option>
                  <option value="10">$10.00</option>
                  <option value="15">$15.00</option>
                  <option value="20">$20.00</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white border-2 border-gray-400 p-6 mb-6">
            <h2 className="text-xl font-bold text-blue-900 mb-4">Detalles Adicionales</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <Input
                name="brand"
                label="Marca"
                placeholder="Ej: Nike, Adidas, Wilson"
                value={formData.brand}
                onChange={handleChange}
              />

              <Input
                name="year"
                label="Año"
                placeholder="Ej: 1970, 1996"
                value={formData.year}
                onChange={handleChange}
              />

              <Input
                name="size"
                label="Talla"
                placeholder="Ej: M, L, XL"
                value={formData.size}
                onChange={handleChange}
              />

              <Input
                name="color"
                label="Color"
                placeholder="Ej: Amarillo, Rojo"
                value={formData.color}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Image Upload Section */}
          <div className="bg-white border-2 border-gray-400 p-6 mb-6">
            <h2 className="text-xl font-bold text-blue-900 mb-4">Imágenes del Producto</h2>
            <div className="border-4 border-dashed border-gray-400 p-12 text-center bg-gray-50">
              <div className="text-5xl mb-4">📸</div>
              <p className="text-gray-600 mb-2">Arrastra imágenes aquí o haz clic para seleccionar</p>
              <p className="text-xs text-gray-500">Máximo 8 imágenes. Formatos: JPG, PNG</p>
              <Button variant="outline" size="medium" className="mt-4">
                Seleccionar Imágenes
              </Button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <Button
              type="button"
              variant="secondary"
              size="large"
              onClick={() => navigate('/seller/products')}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="success"
              size="large"
              className="flex-1"
            >
              {isEditing ? 'Actualizar Producto' : 'Publicar Producto'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;

