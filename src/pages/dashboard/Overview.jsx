
import { useEffect, useState } from "react";
import { getProducts } from "../../services/productService";
import { getUsers } from "../../services/userService";
import { getCarts } from "../../services/cartService";

function Overview() {
  const [stats, setStats] = useState({
    products: 0,
    users: 0,
    carts: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchStats() {
      try {
        setLoading(true);
        setError("");

        const [productsData, usersData, cartsData] =
          await Promise.all([
            getProducts(1, 0),
            getUsers(1, 0),
            getCarts(1, 0),
          ]);

        setStats({
          products: productsData.total,
          users: usersData.total,
          carts: cartsData.total,
        });
      } catch (err) {
        console.error("Error fetching dashboard stats:", err);
        setError("Failed to load dashboard statistics.");
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  const statCards = [
    {
      title: "Total Products",
      value: stats.products,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Total Users",
      value: stats.users,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Total Carts",
      value: stats.carts,
      color: "bg-orange-100 text-orange-600",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Dashboard Overview
        </h1>
        <p className="mt-1 text-gray-500">
          Here's a summary of your store.
        </p>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading statistics...</p>
      ) : error ? (
        <p className="rounded-lg bg-red-50 p-4 text-red-600">
          {error}
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {statCards.map((card) => (
            <div
              key={card.title}
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <p className="text-sm font-medium text-gray-500">
                {card.title}
              </p>

              <p className="mt-3 text-3xl font-bold text-gray-800">
                {card.value}
              </p>

              <span
                className={`mt-4 inline-block rounded-full px-3 py-1 text-xs font-medium ${card.color}`}
              >
                Store Statistics
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Overview;
