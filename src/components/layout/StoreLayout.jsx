import { Outlet } from "react-router-dom";
import StoreNavbar from "./StoreNavbar";

function StoreLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <StoreNavbar />

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default StoreLayout;