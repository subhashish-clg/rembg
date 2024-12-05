import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://rembg-api.snabajja.in",
});

export default axiosClient;
