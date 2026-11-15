import { CheckCircle } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";
import { addCart } from "../../services/cartService";

import {
  getProductStock,
  saveProductStock,
} from "../../services/productService";

function Checkout() {
  const { cartItems, totalItems, totalPrice, clearCart } = useCart();
  const { user } = useAuth();

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    const hasInvalidStock = cartItems.some(
      (item) =>
        item.quantity > getProductStock(item) || getProductStock(item) <= 0,
    );

    if (hasInvalidStock) {
      setError("Some products have insufficient stock.");
      setSubmitting(false);
      return;
    }

    const formData = new FormData(event.currentTarget);

    const order = {
      id: Date.now(),
      customer: {
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        address: formData.get("address"),
      },
      products: cartItems,
      totalPrice,
      createdAt: new Date().toISOString(),
    };

    try {
      // DummyJSON Cart API is available for DummyJSON users only
      if (user?.authType === "dummy") {
        await addCart({
          userId: user.id,
          products: cartItems.map((item) => ({
            id: item.id,
            quantity: item.quantity,
          })),
        });
      }

      cartItems.forEach((item) => {
        const remainingStock = getProductStock(item) - item.quantity;

        saveProductStock(item.id, remainingStock);
      });

      localStorage.setItem("lastOrder", JSON.stringify(order));

      clearCart();
      setOrderPlaced(true);
    } catch (err) {
      console.error("Error placing order:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <div className="text-center py-24">
        <h1 className="text-2xl font-bold">Your cart is empty</h1>
        <Link to="/products" className="text-indigo-600 mt-4 inline-block">
          Browse Products
        </Link>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="max-w-xl mx-auto text-center py-24 px-6">
        <CheckCircle size={72} className="text-green-500 mx-auto mb-6" />

        <h1 className="text-3xl font-bold text-gray-900">
          Order Placed Successfully!
        </h1>

        <p className="text-gray-500 mt-3">
          Thank you for shopping with ANAZONE.
        </p>

        <Link
          to="/products"
          className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-xl mt-8"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <form
          onSubmit={handleSubmit}
          className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 space-y-5"
        >
          <h2 className="text-xl font-bold">Shipping Information</h2>

          <input
            name="name"
            type="text"
            placeholder="Full Name"
            required
            className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:border-indigo-500"
          />

          <input
            name="email"
            type="email"
            placeholder="Email Address"
            required
            className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:border-indigo-500"
          />

          <input
            name="phone"
            type="tel"
            placeholder="Phone Number"
            required
            className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:border-indigo-500"
          />

          <textarea
            name="address"
            placeholder="Full Shipping Address"
            required
            rows="4"
            className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:border-indigo-500"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {submitting ? "Placing Order..." : "Place Order"}
          </button>
        </form>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 h-fit">
          <h2 className="text-xl font-bold mb-6">Order Summary</h2>

          <p className="flex justify-between text-gray-500 mb-4">
            <span>Total Items</span>
            <span>{totalItems}</span>
          </p>

          <div className="space-y-3 mb-5">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between gap-3 text-sm">
                <span className="text-gray-600">
                  {item.title} × {item.quantity}
                </span>
                <span className="font-medium">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t pt-4 flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Checkout;
