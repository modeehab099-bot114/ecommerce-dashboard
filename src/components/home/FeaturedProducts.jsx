
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductGrid from "../products/ProductGrid";
import { getProducts } from "../../services/productService";

function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeaturedProducts() {
      try {
        const data = await getProducts(8, 0);
        setProducts(data.products);
      } catch (error) {
        console.error("Failed to load featured products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchFeaturedProducts();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-indigo-600 font-semibold text-sm mb-2">
            OUR PICKS
          </p>

          <h2 className="text-3xl font-bold text-gray-900">
            Featured Products
          </h2>

          <p className="text-gray-500 mt-2">
            Discover some of our popular products.
          </p>
        </div>

        <Link
          to="/products"
          className="hidden sm:inline-block text-indigo-600 font-semibold hover:text-indigo-700"
        >
          View All
        </Link>
      </div>

      {loading ? (
        <p className="text-center py-12 text-gray-500">
          Loading products...
        </p>
      ) : (
        <ProductGrid products={products} />
      )}

      <div className="text-center mt-8 sm:hidden">
        <Link
          to="/products"
          className="text-indigo-600 font-semibold hover:text-indigo-700"
        >
          View All Products
        </Link>
      </div>
    </section>
  );
}

export default FeaturedProducts;
