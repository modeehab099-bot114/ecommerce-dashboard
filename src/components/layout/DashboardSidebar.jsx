import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  
} from "lucide-react";

const links = [
  { name: "Overview", path: "/dashboard", icon: LayoutDashboard },
  { name: "Products", path: "/dashboard/products", icon: Package },
  { name: "Carts", path: "/dashboard/carts", icon: ShoppingCart },
  { name: "Users", path: "/dashboard/users", icon: Users },
];

function DashboardSidebar() {
  return (
    <aside className="w-64 min-h-screen bg-slate-950 text-white p-6">
      <h2 className="text-2xl font-bold text-indigo-400 mb-10">
        ANAZONE LEADER
      </h2>

      <nav className="space-y-2">
        {links.map(({ name, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            end={path === "/dashboard"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive
                  ? "bg-indigo-600 text-white"
                  : "text-gray-400 hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            <Icon size={20} />
            {name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default DashboardSidebar;