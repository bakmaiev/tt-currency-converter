import axios from "axios";
import { baseURL } from "../helpers/constants";

export const fetchData = async (base, target) => {
  try {
    const { data } = await axios.get(`${baseURL}/pair/${base}/${target}`);
    return data.conversion_rate;
  } catch (error) {
    console.log(error.message);
  }
};
