import { useEffect, useMemo, useState } from "react";
import ProductFilters from "../../components/products/ProductFilters";
import ProductGrid from "../../components/products/ProductGrid";
import ProductPagination from "../../components/products/ProductPagination";
import { getCategories, getProducts } from "../../services/productService";

const PRODUCTS_PER_PAGE = 12;

function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch products and categories
  async function fetchData() {
    try {
      setLoading(true);
      setError("");

      const [productsData, categoriesData] = await Promise.all([
        getProducts(194, 0),
        getCategories(),
      ]);

      setProducts(productsData.products);
      setCategories(categoriesData);
    } catch {
      setError("Failed to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory = !category || product.category === category;

      return matchesSearch && matchesCategory;
    });

    if (sort === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sort === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [products, search, category, sort]);

  // Pagination
  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE),
  );

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE,
  );

  function handlePageChange(page) {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-8">
        <p className="text-indigo-600 font-semibold text-sm mb-2">
          OUR COLLECTION
        </p>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Explore Products
        </h1>

        <p className="text-gray-500 mt-2">
          Find the perfect products for your needs.
        </p>
      </div>

      <ProductFilters
        search={search}
        setSearch={(value) => {
          setSearch(value);
          setCurrentPage(1);
        }}
        category={category}
        setCategory={(value) => {
          setCategory(value);
          setCurrentPage(1);
        }}
        categories={categories}
        sort={sort}
        setSort={(value) => {
          setSort(value);
          setCurrentPage(1);
        }}
      />

      <p className="text-sm text-gray-500 mb-5">
        Showing {filteredProducts.length} products
      </p>

      {loading ? (
        <p className="text-center py-20 text-gray-500">Loading products...</p>
      ) : error ? (
        <div className="text-center py-20">
          <p className="text-red-500 mb-5">{error}</p>

          <button
            onClick={fetchData}
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition"
          >
            Try Again
          </button>
        </div>
      ) : (
        <>
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                No Products Found
              </h2>

              <p className="text-gray-500 mb-6">
                Try changing your search or category filters.
              </p>

              <button
                onClick={() => {
                  setSearch("");
                  setCategory("");
                  setSort("");
                  setCurrentPage(1);
                }}
                className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <>
              <ProductGrid products={paginatedProducts} />

              {filteredProducts.length > PRODUCTS_PER_PAGE && (
                <ProductPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}
        </>
      )}
    </section>
  );
}

export default Products;
