// frontend/src/pages/Public/SearchResults.jsx
import { ProductCard } from "../../components/common/ProductCard";
import { useProducts } from "../../contexts/ProductContext";
import { useSearchParams, Link } from "react-router-dom";

const normalize = (s) =>
    String(s ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

export const SearchResults = () => {
    const { products, loading, error } = useProducts();
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q") || "";

    if (loading) {
        return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <div className="text-center">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-xl text-gray-600">Buscando productos...</p>
            </div>
        </div>
        );
    }

    if (error) {
        return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <div className="bg-red-50 border-2 border-red-400 p-8 text-center max-w-md">
            <div className="text-6xl mb-4">❌</div>
            <h2 className="text-2xl font-bold text-red-800 mb-2">Error</h2>
            <p className="text-red-700">{error}</p>
            </div>
        </div>
        );
    }

    // Función de búsqueda que busca en nombre, descripción y categoría
    const searchProducts = (products, searchQuery) => {
        if (!searchQuery.trim()) return products;

        const normalizedQuery = normalize(searchQuery.trim());
        const queryWords = normalizedQuery.split(/\s+/); // Dividir por espacios

        return products.filter((product) => {
        // Normalizar todos los campos donde queremos buscar
        const normalizedName = normalize(product.name || "");
        const normalizedDescription = normalize(product.description || "");
        const normalizedCategory = normalize(product.category || "");

        // Combinar todos los campos en un solo texto para buscar
        const searchableText = `${normalizedName} ${normalizedDescription} ${normalizedCategory}`;

        // Verificar si TODAS las palabras de búsqueda están presentes
        return queryWords.every((word) => searchableText.includes(word));
        });
    };

    const results = searchProducts(products, query);

    // Agrupar resultados por relevancia (opcional)
    const categorizeResults = (products, query) => {
        const normalizedQuery = normalize(query.trim());
        
        const inName = [];
        const inDescription = [];
        const inCategory = [];

        products.forEach((product) => {
        const normalizedName = normalize(product.name || "");
        const normalizedDescription = normalize(product.description || "");
        const normalizedCategory = normalize(product.category || "");

        if (normalizedName.includes(normalizedQuery)) {
            inName.push(product);
        } else if (normalizedDescription.includes(normalizedQuery)) {
            inDescription.push(product);
        } else if (normalizedCategory.includes(normalizedQuery)) {
            inCategory.push(product);
        }
        });

        return { inName, inDescription, inCategory };
    };

    const categorized = categorizeResults(results, query);

    return (
        <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Breadcrumb */}
            <nav className="text-sm mb-6">
            <Link to="/" className="text-blue-600 hover:underline">
                Inicio
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-600">Resultados de búsqueda</span>
            </nav>

            {/* Header con query */}
            <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Resultados para: "{query}"
            </h1>
            <p className="text-gray-600">
                {results.length}{" "}
                {results.length === 1
                ? "producto encontrado"
                : "productos encontrados"}
            </p>
            </div>

            {/* Resultados */}
            {results.length === 0 ? (
            <div className="bg-white border-2 border-gray-400 p-12 text-center">
                <div className="text-6xl mb-4">🔍</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                No se encontraron resultados
                </h2>
                <p className="text-gray-600 mb-6">
                Intenta con otros términos de búsqueda o explora nuestras
                categorías
                </p>
                <div className="flex gap-4 justify-center flex-wrap">
                <Link to="/products">
                    <button className="bg-blue-600 text-white px-6 py-3 font-bold hover:bg-blue-700 transition border-2 border-blue-800">
                    Ver todos los productos
                    </button>
                </Link>
                <Link to="/">
                    <button className="bg-white text-blue-600 border-2 border-blue-600 px-6 py-3 font-bold hover:bg-blue-50 transition">
                    Volver al inicio
                    </button>
                </Link>
                </div>

                {/* Sugerencias de búsqueda */}
                <div className="mt-8 text-left max-w-md mx-auto">
                <h3 className="font-bold text-gray-800 mb-3">
                    Sugerencias de búsqueda:
                </h3>
                <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Verifica la ortografía de las palabras</li>
                    <li>• Intenta con términos más generales</li>
                    <li>• Busca por categoría: fútbol, basketball, tenis</li>
                    <li>• Busca por marcas: Nike, Adidas, Wilson</li>
                </ul>
                </div>
            </div>
            ) : (
            <div>
                {/* Resultados en el nombre (mayor relevancia) */}
                {categorized.inName.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <span className="text-2xl">🎯</span>
                    Coincidencias exactas ({categorized.inName.length})
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {categorized.inName.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                    </div>
                </div>
                )}

                {/* Resultados en la descripción */}
                {categorized.inDescription.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <span className="text-2xl">📝</span>
                    En la descripción ({categorized.inDescription.length})
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {categorized.inDescription.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                    </div>
                </div>
                )}

                {/* Resultados en la categoría */}
                {categorized.inCategory.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <span className="text-2xl">🏷️</span>
                    Por categoría ({categorized.inCategory.length})
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {categorized.inCategory.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                    </div>
                </div>
                )}
            </div>
                )}
        </div>
        </div>
    );
};

export default SearchResults;