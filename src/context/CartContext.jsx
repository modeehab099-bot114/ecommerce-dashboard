
import { useRef, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { getProductStock } from "../services/productService";
import { CartContext } from "./CartContext.js";

export function CartProvider({ children }) {
  const { user, loading } = useAuth();

  const cartKey = loading
    ? null
    : !user
      ? "cart_guest"
      : user.authType === "local"
        ? `cart_local_${user.username}`
        : `cart_dummy_${user.id}`;

  if (loading) return null;

  return (
    <CartStateProvider key={cartKey} cartKey={cartKey}>
      {children}
    </CartStateProvider>
  );
}

function CartStateProvider({ children, cartKey }) {
 const [initialCart] = useState(() => {
  try {
    const savedCart = localStorage.getItem(cartKey);

    if (!savedCart) {
      return { items: [], error: false };
    }

    const parsedCart = JSON.parse(savedCart);

    const isValidCart =
      Array.isArray(parsedCart) &&
      parsedCart.every(
        (item) =>
          item &&
          typeof item === "object" &&
          Number.isFinite(item.id) &&
          Number.isFinite(item.price) &&
          Number.isFinite(item.quantity) &&
          item.quantity > 0,
      );

    return isValidCart
      ? { items: parsedCart, error: false }
      : { items: [], error: true };
  } catch {
    return { items: [], error: true };
  }
});

const [cartItems, setCartItems] = useState(initialCart.items);
const [storageError, setStorageError] = useState(initialCart.error);

  const cartItemsRef = useRef(cartItems);

  function saveCart(nextItems) {
    cartItemsRef.current = nextItems;
    setCartItems(nextItems);

    try {
      localStorage.setItem(cartKey, JSON.stringify(nextItems));
      setStorageError(false);
    } catch {
      setStorageError(true);
    }
  }

  function addToCart(product) {
    const currentStock = getProductStock(product);

    if (currentStock <= 0) return;

    const currentItems = cartItemsRef.current;
    const existingItem = currentItems.find(
      (item) => item.id === product.id,
    );

    if (existingItem) {
      if (existingItem.quantity >= currentStock) return;

      const updatedItems = currentItems.map((item) =>
        item.id === product.id
          ? {
              ...item,
              stock: currentStock,
              quantity: item.quantity + 1,
            }
          : item,
      );

      saveCart(updatedItems);
      return;
    }

    saveCart([
      ...currentItems,
      { ...product, stock: currentStock, quantity: 1 },
    ]);
  }

  function removeFromCart(productId) {
    const updatedItems = cartItemsRef.current.filter(
      (item) => item.id !== productId,
    );

    saveCart(updatedItems);
  }

  function updateQuantity(productId, quantity) {
    if (quantity < 1) return;

    const updatedItems = cartItemsRef.current
      .map((item) => {
        if (item.id !== productId) return item;

        const currentStock = getProductStock(item);

        if (currentStock <= 0) return null;

        return {
          ...item,
          stock: currentStock,
          quantity: Math.min(quantity, currentStock),
        };
      })
      .filter(Boolean);

    saveCart(updatedItems);
  }

  function clearCart() {
    saveCart([]);
  }

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        storageError,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
