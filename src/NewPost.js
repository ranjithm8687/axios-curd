import { useContext } from "react";
import DataContext from "./context/DataContext";

const NewPost = () => {
  const { postTitle, setPostTitle, postBody, setPostBody, handleSubmit } =
    useContext(DataContext);
  return (
    <main className="NewPost">
      <article>
        <form className="newPostForm" onSubmit={handleSubmit}>
          <label htmlFor="newPost"> Post </label>
          <input
            type="text"
            required
            placeholder="New Post"
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
          />
          <label htmlFor="newCom"> Comments </label>
          <textarea
            name="newCom"
            id="newCom"
            required
            placeholder="New Comments"
            value={postBody}
            onChange={(e) => setPostBody(e.target.value)}
          ></textarea>
          <button className="newPostButton" type="submit">
            Submit
          </button>
        </form>
      </article>
    </main>
  );
};

export default NewPost;
