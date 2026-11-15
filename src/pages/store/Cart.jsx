import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import CartItem from "../../components/cart/CartItem";
import CartSummary from "../../components/cart/CartSummary";
import { useCart } from "../../hooks/useCart";

function Cart() {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalItems,
    totalPrice,
    storageError,
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <section className="max-w-7xl mx-auto px-6 py-24 text-center">
        <ShoppingBag size={64} className="mx-auto text-gray-300 mb-6" />

        <h1 className="text-3xl font-bold text-gray-900">Your Cart is Empty</h1>

        <p className="text-gray-500 mt-3">
          Looks like you haven't added anything to your cart yet.
        </p>

        <Link
          to="/products"
          className="inline-block mt-8 bg-indigo-600 text-white px-8 py-3 rounded-xl hover:bg-indigo-700 transition"
        >
          Browse Products
        </Link>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      {storageError && (
        <p className="mb-6 rounded-xl bg-red-50 p-4 text-sm text-red-600">
         Unable to load or save your cart. Some cart data may be unavailable or changes may be lost after refreshing.
        </p>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onUpdateQuantity={updateQuantity}
              onRemove={removeFromCart}
            />
          ))}
        </div>

        <CartSummary
          totalItems={totalItems}
          totalPrice={totalPrice}
          onClearCart={clearCart}
        />
      </div>
    </section>
  );
}

export default Cart;
