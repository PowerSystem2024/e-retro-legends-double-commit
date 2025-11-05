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
    
    
    
  // const featuredProducts = [
  //   {
  //     id: 1,
  //     name: "Camiseta Retro Brasil 1970 - Pelé #10",
  //     price: 38900.99,
  //     image: null,
  //     shipping: "free",
  //     condition: "Nuevo",
  //   },
  //   {
  //     id: 2,
  //     name: "Jersey Chicago Bulls 1996 - Jordan #23",
  //     price: 34900.99,
  //     image: null,
  //     shipping: "free",
  //     condition: "Usado - Excelente",
  //   },
  //   {
  //     id: 3,
  //     name: "Raqueta Wilson Pro Staff 85 - Edición Sampras",
  //     price: 410909.99,
  //     image: null,
  //     shipping: 15.0,
  //     condition: "Nuevo",
  //   },
  //   {
  //     id: 4,
  //     name: "Camiseta Argentina 1986 - Maradona #10",
  //     price: 69000.99,
  //     image: null,
  //     shipping: "free",
  //     condition: "Réplica",
  //   },
  //   {
  //     id: 5,
  //     name: "Zapatillas Nike Air Jordan 1 Retro High OG",
  //     price: 199900.99,
  //     image: null,
  //     shipping: "free",
  //     condition: "Nuevo",
  //   },
  //   {
  //     id: 6,
  //     name: "Balón Adidas Tango España 82",
  //     price: 27900.99,
  //     image: null,
  //     shipping: 10.0,
  //     condition: "Coleccionable",
  //   },
  //   {
  //     id: 7,
  //     name: "Jersey Lakers Showtime 1985 - Magic Johnson #32",
  //     price: 41340.99,
  //     image: null,
  //     shipping: "free",
  //     condition: "Usado - Muy Bueno",
  //   },
  //   {
  //     id: 8,
  //     name: "Guantes de Boxeo Everlast Vintage 1980s",
  //     price: 59000.99,
  //     image: null,
  //     shipping: 12.0,
  //     condition: "Usado - Bueno",
  //   },
  // ];

  const categories = [
    { name: "Fútbol", icon: "⚽", link: "/category/futbol" },
    { name: "Basketball", icon: "🏀", link: "/category/basketball" },
    { name: "Tenis", icon: "🎾", link: "/category/tenis" },
    { name: "Baseball", icon: "⚾", link: "/category/baseball" },
    { name: "Otros", icon: "🏆", link: "/category/otros" },
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
            <Button variant="primary" size="large" className="px-6 py-3">
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
