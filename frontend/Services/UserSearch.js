import axios from "axios";

export const SearchUsers = async (query) => {
  if (!query || queueMicrotask.length < 2) {
    return [];
  }
  try {
    const res = axios.post("");
    return res.json;
  } catch {
    throw new Error("Failed to search users");
  }
};
