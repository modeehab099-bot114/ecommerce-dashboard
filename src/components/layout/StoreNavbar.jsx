import { LogOut, ShoppingCart, UserRound } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function StoreNavbar() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <nav className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          ANAZONE
        </Link>

        <div className="flex items-center gap-8 text-sm font-medium text-gray-600">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/products">Products</NavLink>

          <Link to="/cart" className="flex items-center gap-2">
            <ShoppingCart size={20} />
            Cart
          </Link>

          {!loading && (
            <>
              {user ? (
                <>
                  <Link to="/account" className="flex items-center gap-2">
                    <UserRound size={20} />
                    Account
                  </Link>

                  {user.role === "admin" && (
                    <Link to="/dashboard">Dashboard</Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-red-500 hover:text-red-600"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login">Login</Link>
                  <Link to="/register">Register</Link>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default StoreNavbar;
