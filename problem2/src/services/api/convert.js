import axiosClient from "../axiosClient";
import { CONVERT } from "../../config/endpoints";
import { API_KEY } from "../../config/constant";

const convertApi = {
  getConvert(params) {
    const url = `${API_KEY}/${CONVERT}/${params.base}/${params.symbols}/${params.amount}`;
    return axiosClient.get(url);
  },
};

export default convertApi;
