import {  useState } from "react";

function ProductForm({ onSubmit, editingProduct, onCancel }) {
  const [formData, setFormData] = useState(() => ({
  title: editingProduct?.title || "",
  description: editingProduct?.description || "",
  price: editingProduct?.price ?? "",
  category: editingProduct?.category || "",
  stock: editingProduct?.stock ?? "",
}));

 

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(formData);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-sm space-y-4"
    >
      <h2 className="text-xl font-bold">
        {editingProduct ? "Edit Product" : "Add New Product"}
      </h2>

      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Product Title"
        required
        className="w-full border rounded-lg p-3"
      />

      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        required
        className="w-full border rounded-lg p-3"
      />

      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Price"
        required
        min="0"
        step="0.01"
        className="w-full border rounded-lg p-3"
      />

      <input
        name="category"
        value={formData.category}
        onChange={handleChange}
        placeholder="Category"
        required
        className="w-full border rounded-lg p-3"
      />

      <input
        type="number"
        name="stock"
        value={formData.stock}
        onChange={handleChange}
        placeholder="Stock"
        required
        min="0"
        className="w-full border rounded-lg p-3"
      />

      <div className="flex gap-3">
        <button
          type="submit"
          className="bg-indigo-600 text-white px-5 py-2 rounded-lg"
        >
          {editingProduct ? "Update Product" : "Add Product"}
        </button>

        {editingProduct && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-200 px-5 py-2 rounded-lg"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default ProductForm;