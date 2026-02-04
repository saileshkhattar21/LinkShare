import { useEffect, useCallback, useState } from "react";
import { getPublicResources } from "../Services/getPublicResources";

export const usePublicResource = () => {
  const [recentPosts, setRecentPosts] = useState([]);

  const fetchPublicResource = useCallback(async () => {
    try {
      const data = await getPublicResources();
      setRecentPosts(data);
    } catch (err) {
      alert(err);
    }
  }, []);

  useEffect(() => {
    fetchPublicResource();

    const intervvalID = setInterval(fetchPublicResource, 10000);

    return () => clearInterval(intervvalID);
  }, [fetchPublicResource]);

  return { recentPosts, refetch: fetchPublicResource };
};
