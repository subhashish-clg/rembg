import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://rembg-api.snabajja.in",
});

export default axiosClient;
