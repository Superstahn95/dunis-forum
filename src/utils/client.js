import axios from "axios";

const client = axios.create({
  baseURL: "https://dunisforum-api.onrender.com/api/v1/",
  //   baseURL: "http://localhost:5500/api/v1/", => when working on my local environment
});

export default client;
