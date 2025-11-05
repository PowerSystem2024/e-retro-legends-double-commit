import { ProductCard } from "../../components/common/ProductCard";
import { useProducts } from "../../contexts/ProductContext";
import { useParams, useSearchParams, Link } from "react-router-dom";

const normalize = (s) =>
  String(s ?? "")
    .normalize("NFD") // separa base + diacríticos
    .replace(/[\u0300-\u036f]/g, "") // quita diacríticos
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

const prettyTitle = (slug) =>
  slug ? slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) : "Todos los productos";

export const AllProducts = () => {
  const { products, loading, error } = useProducts();
  const { categorySlug } = useParams();
  const [searchParams] = useSearchParams();
  const queryCategory = searchParams.get("category");
  const activeSlug = categorySlug || queryCategory || null;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <p className="text-gray-600">Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  // Filtrado usando la columna `category` del producto y comparando normalizados
  const filtered = activeSlug
    ? products.filter((p) => {
        if (!p || p.category == null) return false;
        return normalize(p.category) === normalize(activeSlug);
      })
    : products;

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              {prettyTitle(activeSlug)}
            </h1>
            <p className="text-sm text-gray-600">{filtered.length} resultados</p>
          </div>
          <div className="flex gap-3">
            {activeSlug && <Link to="/products" className="text-blue-600 hover:underline">Ver todos</Link>}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="bg-white p-8 rounded border border-gray-200 text-center">
            <p className="text-gray-700 mb-4">No se encontraron productos.</p>
            <Link to="/products" className="inline-block bg-blue-600 text-white px-4 py-2 rounded">Ver todos los productos</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default AllProducts;
