import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ProductCard } from "../../components/common/ProductCard";
import Button from "../../components/common/Button";
import { useProducts } from "../../contexts/ProductContext";

export const Home = () => {
  const navigate = useNavigate();
  const { products, loading, error } = useProducts();

  const featuredProducts = products.slice(0, 8);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <p className="text-gray-600 text-lx">Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <p className="text-red-600 text-lx">Error: Contactese con el soporte técnico. {error}</p>
      </div>
    );
  }
    

  const categories = [
    { slug: "futbol", name: "Fútbol", icon: "⚽", link: "/products/category/futbol" },
    { slug: "basketball", name: "Basketball", icon: "🏀", link: "/products/category/basketball" },
    { slug: "tenis", name: "Tenis", icon: "🎾", link: "/products/category/tenis" },
    { slug: "baseball", name: "Baseball", icon: "⚾", link: "/products/category/baseball" },
    { slug: "otros", name: "Otros", icon: "🏆", link: "/products/category/otros" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col items-center text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-3">
            Bienvenido a{" "}
            <span className="text-blue-600 flex items-center gap-2">
              <img
                src="/assets/E-logo.gif"
                width={45}
                height={45}
                alt="E logo gif"
              />
              Retro Legends
            </span>
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Reviví la nostalgia deportiva con artículos auténticos de las épocas
            doradas.
          </p>
          <div className="flex gap-4 flex-wrap justify-center">
            <Button variant="primary" size="large" className="px-6 py-3" onClick={() => navigate("/products")}>
              Explorar Productos
            </Button>
            <Button
              onClick={() => navigate("/login")}
              variant="outline"
              size="large"
              className="px-6 py-3 border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              Vender Ahora
            </Button>
          </div>
        </div>
      </section>

      {/* Categorías */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6">
          Categorías populares
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {categories.map((category, index) => (
            <Link
              key={index}
              to={category.link}
              className="bg-white border border-gray-200 rounded-md p-6 text-center shadow-sm hover:shadow-md hover:border-blue-400 transition"
            >
              <div className="text-5xl mb-2">{category.icon}</div>
              <p className="font-medium text-gray-800">{category.name}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Productos destacados */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-semibold text-gray-900">
            Productos destacados
          </h3>
          <Link
            to="/products"
            className="text-blue-600 hover:underline font-medium"
          >
            Ver todos →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        </section>

      {/* Beneficios */}
      <section className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 border border-gray-200 rounded-md shadow-sm">
            <div className="text-4xl mb-3">🚚</div>
            <h4 className="font-semibold text-gray-900 mb-1">Envío gratis</h4>
            <p className="text-sm text-gray-600">
              En compras superiores a $20.000
            </p>
          </div>

          <div className="text-center p-6 border border-gray-200 rounded-md shadow-sm">
            <div className="text-4xl mb-3">✅</div>
            <h4 className="font-semibold text-gray-900 mb-1">
              Autenticidad garantizada
            </h4>
            <p className="text-sm text-gray-600">
              Productos verificados por expertos
            </p>
          </div>

          <div className="text-center p-6 border border-gray-200 rounded-md shadow-sm">
            <div className="text-4xl mb-3">🔒</div>
            <h4 className="font-semibold text-gray-900 mb-1">Compra segura</h4>
            <p className="text-sm text-gray-600">
              Protección del comprador incluida
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
