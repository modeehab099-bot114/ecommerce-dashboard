import api from "./api";

export async function loginUser(username, password) {
  // Check local registered users first
  const localUsers = JSON.parse(localStorage.getItem("localUsers") || "[]");

  const localUser = localUsers.find(
    (user) => user.username === username && user.password === password,
  );

  if (localUser) {
    const userData = {
      ...localUser,
      role: "user",
      authType: "local",
    };

    delete userData.password;

    localStorage.removeItem("token");
    localStorage.setItem("localUser", JSON.stringify(userData));

    return userData;
  }

  // Login with DummyJSON
  const response = await api.post("/auth/login", {
    username,
    password,
    expiresInMins: 60,
  });

const user = {
  ...response.data,
  role: response.data.id === 1 ? "admin" : "user",
  authType: "dummy",
};

  localStorage.removeItem("localUser");
  localStorage.setItem("token", user.accessToken);

  return user;
}

export async function registerUser(userData) {
  // Send registration request to DummyJSON
  const response = await api.post("/users/add", userData);

  // Save registered user locally
  const localUsers = JSON.parse(localStorage.getItem("localUsers") || "[]");

  localUsers.push({
    ...userData,
    id: response.data.id,
    role: "user",
  });

  localStorage.setItem("localUsers", JSON.stringify(localUsers));

  return response.data;
}

export async function getAuthUser() {
  const response = await api.get("/auth/me");

  return {
    ...response.data,
    role: response.data.id === 1 ? "admin" : "user",
    authType: "dummy",
  };
}

export function logoutUser() {
  localStorage.removeItem("token");
  localStorage.removeItem("localUser");
}
