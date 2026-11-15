import { Minus, Plus, Trash2 } from "lucide-react";

function CartItem({ item, onUpdateQuantity, onRemove }) {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-5 bg-white p-5 rounded-2xl border border-gray-100">
      <img
        src={item.thumbnail}
        alt={item.title}
        className="w-24 h-24 object-contain bg-gray-50 rounded-xl p-2"
      />

      <div className="flex-1 text-center sm:text-left">
        <h3 className="font-semibold text-gray-800">{item.title}</h3>
        <p className="text-indigo-600 font-bold mt-2">${item.price}</p>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          disabled={item.quantity === 1}
          className="p-2 rounded-lg border disabled:opacity-40"
        >
          <Minus size={16} />
        </button>

        <span className="font-semibold">{item.quantity}</span>

        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          disabled={item.quantity >= item.stock}
          className="p-2 rounded-lg border disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Plus size={16} />
        </button>
      </div>

      <button
        onClick={() => onRemove(item.id)}
        className="text-red-500 hover:text-red-700 p-2"
        aria-label={`Remove ${item.title}`}
      >
        <Trash2 size={20} />
      </button>
    </div>
  );
}

export default CartItem;
