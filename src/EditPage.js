import { useContext, useEffect } from "react";
import DataContext from "./context/DataContext";
import { Link, useParams } from "react-router-dom";

const EditPage = () => {
  const { posts, editTitle, setEditTitle, editBody, setEditBody, handleEdit } =
    useContext(DataContext);
  const { id } = useParams("");
  const post = posts.find((post) => post.id.toString() === id);

  useEffect(() => {
    if (post) {
      setEditTitle(post.title);
      setEditBody(post.body);
    }
  }, [post, setEditTitle, setEditBody]);

  return (
    <main className="PostPage">
      <article>
        <h1>EditPost</h1>

        {post && (
          <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="editPost">Post</label>
            <input
              type="text"
              id="editPost"
              placeholder="Edit Post"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <label htmlFor="editCom">Comments</label>
            <textarea
              name="editCom"
              id="editCom"
              placeholder="Edit Comments"
              value={editBody}
              onChange={(e) => setEditBody(e.target.value)}
            ></textarea>
            <button
              type="submit"
              className="updateButton"
              onClick={() => handleEdit(post.id)}
            >
              Submit
            </button>
          </form>
        )}

        {!post && (
          <>
            <h2>Post Not Found</h2>
            <p>
              Please Visit Our <Link to={"/"}>Home Page</Link>
            </p>
          </>
        )}
      </article>
    </main>
  );
};

export default EditPage;
