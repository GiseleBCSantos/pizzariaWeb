import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://pizzariaapi-production.up.railway.app/",
  headers: {
    "Content-Type": "application/json",
    method: "GET",
  },
});

const httpClient = ({ endpoint, config }: any) => {
  return axiosInstance(endpoint, config);
};

export { httpClient };
