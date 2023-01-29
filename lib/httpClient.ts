import axios from "axios";

const httpClient = axios.create({
  baseURL: "/api/",
  headers: {
    "Content-type": "application/json",
  },
});

httpClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

export default httpClient;
