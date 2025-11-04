import { ProductCard } from "../../components/common/ProductCard";

export const AllProducts = (featuredProducts) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {featuredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
