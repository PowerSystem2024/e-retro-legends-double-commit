import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { useProducts } from "../../contexts/ProductContext";
import { Loader } from "../../components/common/Loader";
import { showDialog } from "../../components/common/Dialog";
import { converToDataBase64 } from "../../utils/converToDataBase64";

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById, products, createNewProduct, updateProduct } =
    useProducts();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    condition: "new",
    image: null,
    description: "",
    brand: "",
    year: "",
    size: "",
    color: "",
    category: "futbol",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(isEditing);

  useEffect(() => {
    if (isEditing && id) {
      const productId = Number(id);
      const product = getProductById(productId);

      if (product) {
        setFormData({
          name: product.name || "",
          description: product.description || "",
          category: product.category || "futbol",
          price: product.price || "",
          originalPrice: product.originalPrice || "",
          stock: product.stock || "",
          condition: product.condition || "new",
          image: product.image || null,
          brand: product.brand || "",
          year: product.year || "",
          size: product.size || "",
          color: product.color || "",
        });
      } else {
        console.log("Producto NO encontrado");
      }
      setLoading(false);
    }
  }, [products, id, isEditing, getProductById]);

  const categories = [
    { value: "futbol", label: "Fútbol" },
    { value: "basketball", label: "Basketball" },
    { value: "tenis", label: "Tenis" },
    { value: "baseball", label: "Baseball" },
    { value: "otros", label: "Otros Deportes" },
  ];

  const conditions = [
    { value: "new", label: "Nuevo" },
    { value: "used", label: "Usado" },
  ];

  const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
  // Limpiar error del campo cuando empieza a escribir
  if (errors[name]) {
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  }
};
const handleImageFile = (e) => {
  const file = e.target.files?.[0];
  if (!file) return;
  if (!file.type.startsWith("image/")) {
    showDialog({
      content: (
        <div className="p-5">
          <p>Por favor selecciona un archivo de imagen válido.</p>
        </div>
      ),
    });
    return;
  }
  if (file.size > 10 * 1024 * 1024) {
    showDialog({
      content: (
        <div className="p-5">
          <p>La imagen no debe superar los 10MB.</p>
        </div>
      ),
    });
    return;
  }
  
  // Sin async aquí
  converToDataBase64(file).then((base64) => {
    setFormData((prev) => ({ ...prev, image: base64 }));
  });
};

  const validateForm = () => {
  const newErrors = {};

  if (!formData.name || !formData.name.trim()) {
    newErrors.name = "El nombre del producto es requerido";
  }

  if (!formData.description || !formData.description.trim()) {
    newErrors.description = "La descripción es requerida";
  }

  if (!formData.price || Number(formData.price) <= 0) {
    newErrors.price = "El precio debe ser mayor a 0";
  }

  if (formData.stock === "" || Number(formData.stock) < 0) {
    newErrors.stock = "El stock debe ser 1 o mayor";
  }

  if (!formData.category) {
    newErrors.category = "Debes seleccionar una categoría";
  }

  if (!formData.condition) {
    newErrors.condition = "Debes seleccionar una condición";
  }

  return newErrors;
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      // Hay errores de validación
      setErrors(validationErrors);
      return;
    }

    // PUT al backend si se está editando 🐶
    if (isEditing) {
      await updateProduct(formData);
    } else {
      await createNewProduct(formData); // <- de lo contrario POST
    }

    navigate("/seller/products");
  };

  if (loading) return <Loader />;

  console.log("formData:", formData);
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-blue-900">
            {isEditing ? "Editar Producto" : "Nuevo Producto"}
          </h1>
          <p className="text-gray-600">
            {isEditing
              ? "Actualiza la información del producto"
              : "Añade un nuevo producto a tu inventario"}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bg-white border-2 border-gray-400 p-6 mb-6">
            <h2 className="text-xl font-bold text-blue-900 mb-4">
              Información Básica
            </h2>

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
                className={`w-full px-3 py-2 border-2 border-gray-400 focus:border-blue-600 focus:outline-none transition-colors ${
                  errors.description ? "border-red-600" : ""
                }`}
              />
              {errors.description && (
                <p className="text-red-600 text-xs mt-1">
                  {errors.description}
                </p>
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
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
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
                  {conditions.map((cond) => (
                    <option key={cond.value} value={cond.value}>
                      {cond.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white border-2 border-gray-400 p-6 mb-6">
            <h2 className="text-xl font-bold text-blue-900 mb-4">
              Precio e Inventario
            </h2>

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
                name="stock"
                label="Stock Disponible"
                placeholder="0"
                value={formData.stock}
                onChange={handleChange}
                error={errors.stock}
                required
              />
            </div>
          </div>

          <div className="bg-white border-2 border-gray-400 p-6 mb-6">
            <h2 className="text-xl font-bold text-blue-900 mb-4">
              Detalles Adicionales
            </h2>

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
            <h2 className="text-xl font-bold text-blue-900 mb-4">
              Imágenes del Producto
            </h2>
            <div
              id="file-container"
              className="border-4 border-dashed border-gray-400 p-12 text-center bg-gray-50"
              onMouseEnter={() => {
                const container = document.getElementById("file-container");
                if (container) container.style.borderColor = "green";
              }}
              onMouseLeave={() => {
                const container = document.getElementById("file-container");
                container.style.borderColor = "";
              }}
            >
              <div className="text-5xl mb-4">📸</div>
              <p className="text-gray-600 mb-2">
                Arrastra imágenes aquí o haz clic para seleccionar
              </p>
              <p className="text-xs text-gray-500">
                Máximo 8 imágenes. Formatos: JPG, PNG
              </p>
              <label className="mt-4 flex items-center justify-center mx-auto">
                <span className="sr-only">Seleccionar Imagen</span>
                <input
                  type="file"
                  onChange={handleImageFile}
                  className="mt-2 flex w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  multiple
                  accept="image/*"
                />
              </label>
            </div>
          </div>
          <div className="flex gap-4">
            <Button
              type="button"
              variant="secondary"
              size="large"
              onClick={() => navigate("/seller/products")}
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
              {isEditing ? "Actualizar Producto" : "Publicar Producto"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
