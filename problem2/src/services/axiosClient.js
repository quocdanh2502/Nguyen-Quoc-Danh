import axios from "axios";

import { URL_API } from "../config/constant";

const axiosClient = axios.create({
  baseURL: URL_API,
  headers: {
    "Content-Type": "application/json",
  },
  maxRedirects: 0,
});

export default axiosClient;
