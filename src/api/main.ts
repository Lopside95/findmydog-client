import axios from "axios";

export const baseUrl = import.meta.env.VITE_API_URL;

export const getHome = async () => {
  try {
    const res = await axios.get(`${baseUrl}/`);
    return res;
  } catch (error) {
    console.error(error);
  }
};
