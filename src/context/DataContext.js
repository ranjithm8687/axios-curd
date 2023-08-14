import { createContext, useEffect, useState } from "react";
import api from "../api/posts";
import { useNavigate } from "react-router-dom";
import useWindowSize from "../hooks/useWindowSize";
import { format } from "date-fns";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate("");
  const { width } = useWindowSize("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.get("posts");

        setPosts(response.data);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    setTimeout(() => {
      fetchPost();
    }, 2000);
  }, []);

  useEffect(() => {
    const finalResult = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.body.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(finalResult.reverse());
  }, [posts, search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const title = postTitle;
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const body = postBody;
    const postLayout = { id, title, datetime, body };
    try {
      const response = await api.post("posts", postLayout);
      const newPost = [...posts, response.data];
      setPosts(newPost);
      setPostTitle("");
      setPostBody("");
      navigate("/");
    } catch (err) {
      setFetchError(err.message);
    }
  };

  const handleEdit = async (id) => {
    const title = editTitle;
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const body = editBody;
    const postLayout = { id, title, datetime, body };
    try {
      const response = await api.put(`/posts/${id}`, postLayout);
      const editPostLayout = posts.map((post) =>
        post.id === id ? { ...response.data } : post
      );
      setPosts(editPostLayout);
      setEditTitle("");
      setEditBody("");
      navigate("/");
    } catch (err) {
      setFetchError(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`posts/${id}`);
      const deletePost = posts.filter((post) => post.id !== id);
      setPosts(deletePost);
      navigate("/");
    } catch (err) {
      setFetchError(err.message);
    }
  };

  return (
    <DataContext.Provider
      value={{
        width,
        posts,
        search,
        setSearch,
        searchResults,
        postTitle,
        setPostTitle,
        postBody,
        setPostBody,
        editTitle,
        setEditTitle,
        editBody,
        setEditBody,
        fetchError,
        isLoading,
        handleSubmit,
        handleEdit,
        handleDelete,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
