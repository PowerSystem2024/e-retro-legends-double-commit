import { ProductCard } from "../../components/common/ProductCard";
import { useProducts } from "../../contexts/ProductContext";
import { useParams, Link } from "react-router-dom";
import { Loader } from "../../components/common/Loader";

const normalize = (s) =>
  String(s ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/^-+|-+$/g, "");

const prettyTitle = (slug) =>
  slug ? slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) : "Todos los productos";

export const AllProducts = () => {
  const { products, loading, error } = useProducts();
  const { categorySlug } = useParams();
  const activeSlug = categorySlug || null;

  if (loading) <Loader />

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="bg-red-50 border-2 border-red-400 p-8 text-center max-w-md">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-red-800 mb-2">Error</h2>
          <p className="text-red-700">{error}</p>
          <Link to="/" className="inline-block mt-4 bg-red-600 text-white px-6 py-2 hover:bg-red-700">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  // Filtrado usando la columna `category` del productos
  const filtered = activeSlug
    ? products.filter((p) => {
        if (!p || p.category == null) return false;
        return normalize(p.category) === normalize(activeSlug);
      })
    : products;

  const categories = [
    { slug: "futbol", name: "Fútbol", icon: "⚽" },
    { slug: "basketball", name: "Basketball", icon: "🏀" },
    { slug: "tenis", name: "Tenis", icon: "🎾" },
    { slug: "baseball", name: "Baseball", icon: "⚾" },
    { slug: "otro", name: "Otro", icon: "🏆" },
  ];
  
  const activeCategory = categories.find(
    (cat) => normalize(cat.slug) === normalize(categorySlug)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm mb-6">
          <Link to="/" className="text-blue-600 hover:underline">Inicio</Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link to="/products" className="text-blue-600 hover:underline">Productos</Link>
          {activeSlug && (
            <>
              <span className="mx-2 text-gray-400">/</span>
              <span className="text-gray-600">{prettyTitle(activeSlug)}</span>
            </>
          )}
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Categorías */}
          <aside className="lg:col-span-1">
            <div className="bg-white border-2 border-gray-400 p-4 sticky top-4">
              <h2 className="text-xl font-bold text-blue-900 mb-4">Categorías</h2>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/products"
                    className={`flex items-center gap-3 p-3 hover:bg-gray-100 transition ${
                      !activeSlug ? "bg-blue-50 border-l-4 border-blue-600 font-bold" : ""
                    }`}
                  >
                    <span className="text-2xl">🏪</span>
                    <span>Todos los productos</span>
                    <span className="ml-auto text-sm text-gray-600">({products.length})</span>
                  </Link>
                </li>
                {categories.map((cat) => {
                  const count = (products ?? []).filter((p) => p?.category && normalize(p.category) === cat.slug).length;
                  return (
                    <li key={cat.slug}>
                      <Link
                        to={`/products/category/${cat.slug}`}
                        className={`flex items-center gap-3 p-3 hover:bg-gray-100 transition ${
                          normalize(activeSlug) === cat.slug
                            ? "bg-blue-50 border-l-4 border-blue-600 font-bold"
                            : ""
                        }`}
                      >
                        <span className="text-2xl">{cat.icon}</span>
                        <span>{cat.name}</span>
                        <span className="ml-auto text-sm text-gray-600">({count})</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>

          {/* Main Content - Productos */}
          <main className="lg:col-span-3">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {activeCategory
                  ? `${activeCategory.icon} ${activeCategory.name}`
                  : "Todos los productos"}
              </h1>
              <p className="text-gray-600">
                {filtered.length} {filtered.length === 1 ? "producto encontrado" : "productos encontrados"}
              </p>
            </div>

            {filtered.length === 0 ? (
              <div className="bg-white border-2 border-gray-400 p-12 text-center">
                <div className="text-6xl mb-4">📦</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  No hay productos en esta categoría
                </h2>
                <p className="text-gray-600 mb-6">
                  Explora otras categorías o vuelve a la tienda principal
                </p>
                <Link to="/products">
                  <button className="bg-blue-600 text-white px-6 py-3 font-bold hover:bg-blue-700 transition">
                    Ver todos los productos
                  </button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
