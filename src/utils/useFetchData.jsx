import axios from "axios";
import Cookies from "js-cookie";

export const fetchData = async (endpoint) => {
  const token = Cookies.get("accessToken");
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/${endpoint}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data.data.length;
  } catch (error) {
    console.error(`Failed to fetch ${endpoint}`, error);
    throw new Error(`Failed to fetch ${endpoint} data.`);
  }
};
