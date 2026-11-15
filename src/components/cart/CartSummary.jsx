import { Link } from "react-router-dom";

function CartSummary({ totalItems, totalPrice, onClearCart }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 h-fit">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

      <div className="flex justify-between text-gray-500 mb-4">
        <span>Total Items</span>
        <span>{totalItems}</span>
      </div>

      <div className="flex justify-between text-gray-500 mb-4">
        <span>Shipping</span>
        <span className="text-green-600">Free</span>
      </div>

      <div className="border-t border-gray-100 pt-4 flex justify-between font-bold text-lg">
        <span>Total</span>
        <span>${totalPrice.toFixed(2)}</span>
      </div>

      <Link
        to="/checkout"
        className="block w-full text-center bg-indigo-600 text-white py-3 rounded-xl mt-6 hover:bg-indigo-700 transition"
      >
        Proceed to Checkout
      </Link>

      <button
        type="button"
        onClick={onClearCart}
        className="w-full text-red-500 text-sm mt-4 hover:text-red-700"
      >
        Clear Cart
      </button>
    </div>
  );
}

export default CartSummary;
