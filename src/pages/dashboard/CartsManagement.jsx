import { useEffect, useState } from "react";
import {
  addCart,
  deleteCart,
  getCarts,
  updateCart,
} from "../../services/cartService";
import CartTable from "./CartTable";

function CartsManagement() {
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const [selectedCart, setSelectedCart] = useState(null);
  const [editingCart, setEditingCart] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [userId, setUserId] = useState("");
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [saving, setSaving] = useState(false);

  async function fetchCarts() {
    try {
      setLoading(true);
      setError("");

      const data = await getCarts(0, 0);
      setCarts(data.carts || []);
    } catch {
      setError("Failed to load carts. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function loadCarts() {
      await fetchCarts();
    }

    loadCarts();
  }, []);

  function resetForm() {
    setUserId("");
    setProductId("");
    setQuantity("1");
    setEditingCart(null);
    setShowForm(false);
  }

  function handleEdit(cart) {
    setEditingCart(cart);
    setUserId(String(cart.userId));
    setProductId(String(cart.products[0]?.id || ""));
    setQuantity(String(cart.products[0]?.quantity || 1));
    setShowForm(true);
    setSelectedCart(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      !userId ||
      !productId ||
      Number(userId) <= 0 ||
      Number(productId) <= 0 ||
      Number(quantity) <= 0
    ) {
      setError("Please enter valid user, product and quantity values.");
      return;
    }

    const cartData = {
      userId: Number(userId),
      products: [
        {
          id: Number(productId),
          quantity: Number(quantity),
        },
      ],
    };

    try {
      setSaving(true);
      setError("");

      if (editingCart) {
        const updatedCart = await updateCart(editingCart.id, cartData);

        setCarts((prev) =>
          prev.map((cart) =>
            cart.id === editingCart.id ? { ...cart, ...updatedCart } : cart,
          ),
        );
      } else {
        const newCart = await addCart(cartData);
        setCarts((prev) => [newCart, ...prev]);
      }

      resetForm();
    } catch {
      setError("Failed to save cart. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this cart?",
    );

    if (!confirmed) return;

    try {
      setError("");

      await deleteCart(id);

      setCarts((prev) => prev.filter((cart) => cart.id !== id));

      if (selectedCart?.id === id) {
        setSelectedCart(null);
      }
    } catch {
      setError("Failed to delete cart. Please try again.");
    }
  }

  const filteredCarts = carts.filter(
    (cart) =>
      String(cart.id).includes(search) || String(cart.userId).includes(search),
  );

  if (loading) {
    return (
      <div className="p-8 text-center text-slate-500">Loading carts...</div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Carts Management
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage customer shopping carts
          </p>
        </div>

        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="rounded-lg bg-indigo-600 px-5 py-3 font-medium text-white hover:bg-indigo-700"
        >
          Add Cart
        </button>
      </div>

      {error && (
        <div className="rounded-lg bg-red-100 p-4 text-red-700">{error}</div>
      )}

      <input
        type="text"
        placeholder="Search by Cart ID or User ID..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-indigo-500"
      />

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-xl border border-slate-200 bg-white p-6"
        >
          <h2 className="text-lg font-bold text-slate-800">
            {editingCart ? "Edit Cart" : "Add New Cart"}
          </h2>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-medium">User ID</label>
              <input
                type="number"
                min="1"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="w-full rounded-lg border border-slate-300 p-3"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Product ID
              </label>
              <input
                type="number"
                min="1"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                className="w-full rounded-lg border border-slate-300 p-3"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Quantity</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full rounded-lg border border-slate-300 p-3"
                required
              />
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-indigo-600 px-5 py-2 text-white disabled:opacity-50"
            >
              {saving
                ? "Saving..."
                : editingCart
                  ? "Update Cart"
                  : "Create Cart"}
            </button>

            <button
              type="button"
              onClick={resetForm}
              className="rounded-lg bg-slate-200 px-5 py-2 text-slate-700"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {selectedCart && (
        <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">
              Cart #{selectedCart.id} Details
            </h2>

            <button
              onClick={() => setSelectedCart(null)}
              className="text-slate-500 hover:text-slate-800"
            >
              Close
            </button>
          </div>

          <p>User ID: {selectedCart.userId}</p>
          <p>Total Products: {selectedCart.totalProducts}</p>
          <p>Total Quantity: {selectedCart.totalQuantity}</p>
          <p>Total: ${selectedCart.total}</p>
          <p>Discounted Total: ${selectedCart.discountedTotal}</p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="p-3">Product</th>
                  <th className="p-3">Quantity</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Total</th>
                </tr>
              </thead>

              <tbody>
                {selectedCart.products.map((product) => (
                  <tr key={product.id} className="border-t">
                    <td className="p-3">{product.title}</td>
                    <td className="p-3">{product.quantity}</td>
                    <td className="p-3">${product.price}</td>
                    <td className="p-3">${product.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {filteredCarts.length > 0 ? (
        <CartTable
          carts={filteredCarts}
          onView={setSelectedCart}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ) : (
        <div className="rounded-xl bg-white p-10 text-center text-slate-500">
          No carts found.
        </div>
      )}
    </div>
  );
}

export default CartsManagement;
