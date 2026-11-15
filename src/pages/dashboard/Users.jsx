
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import {
  getUsers,
  getUserById,
} from "../../services/userService";

function Users() {
  const { user } = useAuth();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);

  const usersPerPage = 10;

  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        const data = await getUsers(0, 0);
        setUsers(data.users);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to load users.");
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((item) => {
    const searchValue = search.toLowerCase();

    return (
      `${item.firstName} ${item.lastName}`
        .toLowerCase()
        .includes(searchValue) ||
      item.username.toLowerCase().includes(searchValue) ||
      item.email.toLowerCase().includes(searchValue)
    );
  });

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const startIndex = (currentPage - 1) * usersPerPage;

  const currentUsers = filteredUsers.slice(
    startIndex,
    startIndex + usersPerPage
  );

  async function handleViewDetails(id) {
    try {
      setDetailsLoading(true);
      const data = await getUserById(id);
      setSelectedUser(data);
    } catch (err) {
      console.error("Error fetching user details:", err);
      setError("Failed to load user details.");
    } finally {
      setDetailsLoading(false);
    }
  }

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Users Management
        </h1>
        <p className="text-gray-500 mt-1">
          Manage and view registered users.
        </p>
      </div>

      <div className="bg-white rounded-xl border p-5">
        <h2 className="font-semibold text-gray-900 mb-2">
          Current Admin
        </h2>
        <p className="text-gray-600">
          {user?.firstName} {user?.lastName}
        </p>
        <p className="text-sm text-gray-500">{user?.email}</p>
      </div>

      <div className="bg-white rounded-xl border p-5">
        <input
          type="text"
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            setCurrentPage(1);
          }}
          placeholder="Search by name, username, or email..."
          className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-indigo-500"
        />
      </div>

      {loading ? (
        <p className="text-center py-10 text-gray-500">
          Loading users...
        </p>
      ) : error ? (
        <p className="text-center py-10 text-red-500">{error}</p>
      ) : (
        <div className="bg-white rounded-xl border overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-600 text-sm">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Username</th>
                <th className="p-4">Email</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {currentUsers.map((item) => (
                <tr key={item.id} className="border-t text-sm">
                  <td className="p-4 font-medium">
                    {item.firstName} {item.lastName}
                  </td>
                  <td className="p-4">{item.username}</td>
                  <td className="p-4">{item.email}</td>
                  <td className="p-4">{item.phone}</td>
                  <td className="p-4">
                    <button
                      onClick={() => handleViewDetails(item.id)}
                      className="text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredUsers.length === 0 && (
            <p className="text-center py-8 text-gray-500">
              No users found.
            </p>
          )}
        </div>
      )}

      {!loading && !error && totalPages > 1 && (
        <div className="flex justify-center items-center gap-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((page) => page - 1)}
            className="px-4 py-2 border rounded-lg disabled:opacity-40"
          >
            Previous
          </button>

          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((page) => page + 1)}
            className="px-4 py-2 border rounded-lg disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}

      {detailsLoading && (
        <p className="text-center text-gray-500">
          Loading user details...
        </p>
      )}

      {selectedUser && (
        <div className="bg-white border rounded-xl p-6 space-y-3">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">User Details</h2>
            <button
              onClick={() => setSelectedUser(null)}
              className="text-red-500 font-medium"
            >
              Close
            </button>
          </div>

          <p><strong>Name:</strong> {selectedUser.firstName} {selectedUser.lastName}</p>
          <p><strong>Username:</strong> {selectedUser.username}</p>
          <p><strong>Email:</strong> {selectedUser.email}</p>
          <p><strong>Phone:</strong> {selectedUser.phone}</p>
          <p><strong>Age:</strong> {selectedUser.age}</p>
          <p><strong>Gender:</strong> {selectedUser.gender}</p>
          <p><strong>Address:</strong> {selectedUser.address?.address}</p>
        </div>
      )}
    </section>
  );
}

export default Users;
