import axios from "axios";

export const getPublicResources = async () => {
  try {
    const res = axios.get("http://localhost:5000/api/resource/public", {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    alert(err);
  }
};
