import { useEffect, useState } from "react";
import {
  addProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../../services/productService";

import ProductForm from "../../components/dashboard/ProductForm";
import ProductTable from "../../components/dashboard/ProductTable";

function ProductsManagement() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      try {
       const data = await getProducts(0, 0);
        setProducts(data.products);
      } catch {
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  async function handleSubmit(formData) {
    try {
      setError("");

      const productData = {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
      };

      if (editingProduct) {
        const updatedProduct = await updateProduct(
          editingProduct.id,
          productData,
        );

        setProducts((prev) =>
          prev.map((product) =>
            product.id === editingProduct.id
              ? { ...product, ...updatedProduct }
              : product,
          ),
        );
      } else {
        const newProduct = await addProduct(productData);

        setProducts((prev) => [newProduct, ...prev]);
      }

      setEditingProduct(null);
      setShowForm(false);
    } catch {
      setError("Failed to save product.");
    }
  }

  function handleEdit(product) {
    setEditingProduct(product);
    setShowForm(true);
  }

  async function handleDelete(id) {
    try {
      setError("");

      await deleteProduct(id);

      setProducts((prev) => prev.filter((product) => product.id !== id));
    } catch {
      setError("Failed to delete product.");
    }
  }

  function handleCancel() {
    setEditingProduct(null);
    setShowForm(false);
  }

  if (loading) {
    return <p className="p-8 text-center">Loading products...</p>;
  }

  return (
    <section className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manage Products</h1>

        <button
          onClick={() => {
            setEditingProduct(null);
            setShowForm(true);
          }}
          className="bg-indigo-600 text-white px-5 py-2 rounded-lg"
        >
          Add Product
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {showForm && (
        <ProductForm
          key={editingProduct?.id || "new"}
          onSubmit={handleSubmit}
          editingProduct={editingProduct}
          onCancel={handleCancel}
        />
      )}

      <ProductTable
        products={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </section>
  );
}

export default ProductsManagement;
