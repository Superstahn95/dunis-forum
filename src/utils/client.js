import axios from "axios";

const client = axios.create({
  baseURL: "https://dunisforum-api.onrender.com/api/v1/",
});

export default client;
