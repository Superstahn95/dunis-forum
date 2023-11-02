import client from "../../utils/client";

const getAllUsers = async () => {
  const token = localStorage.getItem("userToken");
  if (!token) {
    return console.log("No token"); //look for a better way of handling this error
  }
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  const response = await client.get("users", config);
  return response.data.users;
};

const authorizeUser = async (id) => {
  const token = localStorage.getItem("userToken");
  if (!token) {
    return console.log("No token"); //look for a better way of handling this error
  }
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  const response = await client.patch(`users/authorize/${id}`, {}, config);
  return response.data.message;
};

const revokeUser = async (id) => {
  console.log("In our users service");
  const token = localStorage.getItem("userToken");
  if (!token) {
    return console.log("No token"); //look for a better way of handling this error
  }
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  const response = await client.patch(`users/revoke/${id}`, {}, config);
  return response.data.message;
};

const deleteUser = async (id) => {
  const token = localStorage.getItem("userToken");
  if (!token) {
    return console.log("No token"); //look for a better way of handling this error
  }
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  const response = await client.delete(`users/${id}`, config);
  return response.data.message;
};

const createUser = async (data) => {
  const token = localStorage.getItem("userToken");
  if (!token) {
    return console.log("No token"); //look for a better way of handling this error
  }
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  const response = await client.post("auth/register", data, config);
  return response.data.message;
};

const usersService = {
  getAllUsers,
  authorizeUser,
  revokeUser,
  deleteUser,
  createUser,
};

export default usersService;
