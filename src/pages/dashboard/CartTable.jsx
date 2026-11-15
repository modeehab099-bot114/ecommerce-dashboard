
function CartTable({ carts, onView, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-100 text-slate-600">
          <tr>
            <th className="p-4">Cart ID</th>
            <th className="p-4">User ID</th>
            <th className="p-4">Products</th>
            <th className="p-4">Quantity</th>
            <th className="p-4">Total</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          {carts.map((cart) => (
            <tr key={cart.id} className="border-t border-slate-200">
              <td className="p-4 font-medium">#{cart.id}</td>
              <td className="p-4">{cart.userId}</td>
              <td className="p-4">{cart.totalProducts}</td>
              <td className="p-4">{cart.totalQuantity}</td>
              <td className="p-4 font-semibold">${cart.total}</td>

              <td className="p-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => onView(cart)}
                    className="rounded-lg bg-blue-100 px-3 py-2 text-blue-700"
                  >
                    View
                  </button>

                  <button
                    onClick={() => onEdit(cart)}
                    className="rounded-lg bg-amber-100 px-3 py-2 text-amber-700"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(cart.id)}
                    className="rounded-lg bg-red-100 px-3 py-2 text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CartTable;
