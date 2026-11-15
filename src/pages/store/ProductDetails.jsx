import { Star } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { getProductById, getProductStock } from "../../services/productService";

function ProductDetails() {
  const { id } = useParams();
  const { addToCart, cartItems } = useCart();

  
  const [product, setProduct] = useState(null);
  const [stock, setStock] = useState(0);

  const cartItem = cartItems.find((item) => item.id === product?.id);
  const limitReached = stock <= 0 || (cartItem?.quantity ?? 0) >= stock;

  const [isAdded, setIsAdded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  
 
const fetchProduct = useCallback(async () => {
  try {
    setLoading(true);
    setError("");

    const data = await getProductById(id);
    setProduct(data);
    setStock(getProductStock(data));
  } catch {
    setError("Failed to load product details.");
  } finally {
    setLoading(false);
  }
}, [id]);


useEffect(() => {
  const timer = setTimeout(() => {
    fetchProduct();
  }, 0);

  return () => clearTimeout(timer);
}, [fetchProduct]);


  useEffect(() => {
    if (!isAdded) return;

    const timer = setTimeout(() => {
      setIsAdded(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [isAdded]);

  function handleAddToCart() {
    if (limitReached) return;

    addToCart({ ...product, stock });
    setIsAdded(true);
  }

  if (loading) {
    return <p className="text-center py-20">Loading product...</p>;
  }


  if (error || !product) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500 mb-5">
          {error || "Product not found."}
        </p>

        {error && (
          <button
            onClick={fetchProduct}
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition"
          >
            Try Again
          </button>
        )}
      </div>
    );
  }


  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="bg-white rounded-2xl p-8 flex items-center justify-center">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full max-h-96 object-contain"
          />
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-indigo-600 font-medium capitalize mb-3">
            {product.category}
          </p>

          <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>

          <div className="flex items-center gap-2 mt-4 text-amber-500">
            <Star size={18} fill="currentColor" />
            <span>{product.rating}</span>
            <span className="text-gray-400">
              ({product.reviews?.length || 0} reviews)
            </span>
          </div>

          <p className="text-gray-500 leading-7 mt-6">{product.description}</p>

          <p className="text-3xl font-bold text-gray-900 mt-6">
            ${product.price}
          </p>

          <p
            className={`text-sm mt-3 ${stock > 0 ? "text-gray-500" : "text-red-500"}`}
          >
            {stock > 0 ? `${stock} items in stock` : "Out of stock"}
          </p>
          <button
            onClick={handleAddToCart}
            disabled={limitReached}
            className={`mt-6 text-white px-8 py-3 rounded-xl font-semibold transition ${
              limitReached
                ? "bg-gray-400 cursor-not-allowed"
                : isAdded
                  ? "bg-green-600"
                  : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {stock <= 0
              ? "Out of Stock"
              : limitReached
                ? "Stock Limit Reached"
                : isAdded
                  ? "Added to Cart ✓"
                  : "Add to Cart"}
          </button>
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;
