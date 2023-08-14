import { useContext } from "react";
import DataContext from "./context/DataContext";
import { Link, useParams } from "react-router-dom";

const PostPage = () => {
  const { posts, handleDelete } = useContext(DataContext);
  const { id } = useParams("");
  const post = posts.find((post) => post.id.toString() === id);
  return (
    <main className="PostPage">
      <article>
        <h2>{post.title}</h2>
        <p className="postDate">{post.datetime}</p>
        <p className="postBody">{post.body}</p>
        <Link to={`/edit/${post.id}`}>
          <button className="editPost">Edit</button>
        </Link>
        <button className="deletePost" onClick={() => handleDelete(post.id)}>
          Delete
        </button>
      </article>
    </main>
  );
};

export default PostPage;
