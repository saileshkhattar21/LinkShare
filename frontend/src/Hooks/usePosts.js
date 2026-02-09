import { useEffect, useRef, useState, useCallback } from "react";
import axios from "axios";

export const usePosts = ({ type, enabled }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const cacheRef = useRef({});

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `http://localhost:5000/api/resources/${type}`,
        { withCredentials: true },
      );

      cacheRef.current[type] = res.data;
      setPosts(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [type]);

  useEffect(() => {
    if (!enabled) return;

    if (cacheRef.current[type]) {
      setPosts(cacheRef.current[type]);
      return;
    }

    fetchPosts();
  }, [enabled, type, fetchPosts]);

  return { posts, loading, refresh: fetchPosts };
};
