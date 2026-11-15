
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../../services/productService";

function CategoriesSection() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Failed to load categories:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="mb-8">
        <p className="text-indigo-600 font-semibold text-sm mb-2">
          BROWSE CATEGORIES
        </p>

        <h2 className="text-3xl font-bold text-gray-900">
          Shop by Category
        </h2>

        <p className="text-gray-500 mt-2">
          Explore our wide range of product categories.
        </p>
      </div>

      {loading ? (
        <p className="text-center py-12 text-gray-500">
          Loading categories...
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link
              key={category.slug}
              to={`/products?category=${category.slug}`}
              className="bg-white border border-gray-100 rounded-xl p-6 text-center hover:border-indigo-300 hover:shadow-md transition"
            >
              <h3 className="font-semibold text-gray-800 capitalize">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}

export default CategoriesSection;
