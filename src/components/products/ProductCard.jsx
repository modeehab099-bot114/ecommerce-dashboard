import { Check, ShoppingCart, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { getProductStock } from "../../services/productService";

function ProductCard({ product }) {
  const { addToCart, cartItems } = useCart();

  const [isAdded, setIsAdded] = useState(false);
  const stock = getProductStock(product);
  
  const cartItem = cartItems.find((item) => item.id === product.id);
  const limitReached = stock <= 0 || (cartItem?.quantity ?? 0) >= stock;

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

  return (
    <article className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition">
      <Link to={`/products/${product.id}`}>
        <div className="bg-gray-50 h-56 flex items-center justify-center p-6">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="h-full w-full object-contain"
          />
        </div>
      </Link>

      <div className="p-5">
        <p className="text-xs text-indigo-600 font-medium mb-2 capitalize">
          {product.category}
        </p>

        <Link to={`/products/${product.id}`}>
          <h3 className="font-semibold text-gray-800 line-clamp-2 min-h-12 hover:text-indigo-600 transition">
            {product.title}
          </h3>
        </Link>

        <div className="flex items-center gap-1 text-amber-500 text-sm mt-3">
          <Star size={16} fill="currentColor" />
          <span>{product.rating}</span>
        </div>

        <p
          className={`text-xs mt-3 ${stock > 0 ? "text-gray-500" : "text-red-500"}`}
        >
          {stock > 0 ? `${stock} items in stock` : "Out of Stock"}
        </p>

        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-bold text-gray-900">
            ${product.price}
          </span>

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={limitReached}
            className={`${
              limitReached
                ? "bg-gray-400 cursor-not-allowed"
                : isAdded
                  ? "bg-green-600"
                  : "bg-indigo-600 hover:bg-indigo-700"
            } text-white p-3 rounded-xl transition`}
            aria-label={
              limitReached
                ? "Stock limit reached"
                : isAdded
                  ? "Added to cart"
                  : `Add ${product.title} to cart`
            }
          >
            {limitReached ? (
              <span className="text-xs">Full</span>
            ) : isAdded ? (
              <Check size={18} />
            ) : (
              <ShoppingCart size={18} />
            )}
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
