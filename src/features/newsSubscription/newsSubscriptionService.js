import client from "../../utils/client";
const createSubscriber = async (data) => {
  const response = await client.post("newsletter", data);
  return response.data.message;
};

const deleteSubscriber = async (id) => {
  const token = localStorage.getItem("userToken");
  if (!token) {
    return console.log("No token found, hence not authorized");
  }
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = await client.delete(`newsletter/${id}`, config);
  return response.data.message;
};

const getSubscribers = async () => {
  const token = localStorage.getItem("userToken");
  if (!token) {
    return console.log("No token found, hence not authorized");
  }
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  const response = await client.get(`newsletter`, config);
  return response.data;
};

const newsSubscriptionService = {
  createSubscriber,
  deleteSubscriber,
  getSubscribers,
};

export default newsSubscriptionService;
