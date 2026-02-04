import axios from "axios";

export const SearchUsers = async (query) => {
  console.log("Frontend Query = ", query);
  if (!query) {
    return [];
  }
  try {
    const res = await axios.get(
      `http://localhost:5000/api/searches/users/?q=${query}`,
      {
        withCredentials: true,
      },
    );
    console.log(res.data);
    return res.data;
  } catch {
    throw new Error("Failed to search users");
  }
};
