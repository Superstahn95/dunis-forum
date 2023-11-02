import client from "../../utils/client";

const register = async (data) => {
  const response = await client.post("auth/register", data);
  if (response.data) {
    localStorage.setItem("userToken", response.data.token);
  }

  return response.data.user;
};

const login = async (data) => {
  const response = await client.post("auth/login", data);
  if (response.data) {
    localStorage.setItem("userToken", response.data.token);
  }
  return response.data.user;
};

const reAuthenticate = async (token) => {
  const response = await client.post("auth/reauthenticate", { token });

  return response.data.user;
};
const updateUser = async (data) => {
  const token = localStorage.getItem("userToken");
  if (!token) {
    return console.log("No token"); //look for a better way of handling this error
  }
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
      //   "Content-Type": "multipart/form-data",
    },
  };
  const response = await client.patch("users/update", data, config);
  return response.data;
};

const changePassword = async (data) => {
  const token = localStorage.getItem("userToken");
  if (!token) {
    return console.log("No token"); //look for a better way of handling this error
  }
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
      //   "Content-Type": "multipart/form-data",
    },
  };
  const response = await client.patch("auth/change-password", data, config);
  return response.data;
};

const logout = () => {
  localStorage.removeItem("userToken");
};

const authService = {
  register,
  login,
  reAuthenticate,
  logout,
  updateUser,
  changePassword,
};

export default authService;
