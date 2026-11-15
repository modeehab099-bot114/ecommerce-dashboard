
import { useAuth } from "../../hooks/useAuth";
import { UserRound, Mail, LogOut } from "lucide-react";

function Account() {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500">No user information found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-orange-100 p-4 rounded-full">
            <UserRound size={32} className="text-orange-500" />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              My Account
            </h1>
            <p className="text-gray-500">
              Manage your profile information
            </p>
          </div>
        </div>

        <div className="space-y-5">
          <div>
            <p className="text-sm text-gray-500 mb-1">First Name</p>
            <p className="font-semibold text-gray-800">
              {user.firstName || "Not available"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">Last Name</p>
            <p className="font-semibold text-gray-800">
              {user.lastName || "Not available"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">Username</p>
            <p className="font-semibold text-gray-800">
              {user.username || "Not available"}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Mail size={20} className="text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-semibold text-gray-800">
                {user.email || "Not available"}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={logout}
          className="mt-10 flex items-center justify-center gap-2 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg transition"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
}

export default Account;
