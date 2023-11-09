import React, { useState, useEffect } from "react";
import { useUserContext } from "../../components/UserContext";
import { useNavigate, useParams, Params } from "react-router-dom";

interface RouteParams {
  postId?: string;
}

const EditPost: React.FC = () => {
  const { posts, editPost } = useUserContext();
  const navigate = useNavigate();
  const { postId }: RouteParams = useParams();
  console.log(postId);

  const [updatedPost, setUpdatedPost] = useState({ title: "", content: "" });

  useEffect(() => {
    if (postId) {
      const postToEdit = posts.find((post) => post.id === parseInt(postId, 10));

      if (postToEdit) {
        setUpdatedPost({
          title: postToEdit.title,
          content: postToEdit.content,
        });
      }
    }
  }, [postId, posts]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUpdatedPost((prevPost) => ({ ...prevPost, [name]: value }));
  };

  const handleUpdatePost = () => {
    if (postId) {
      editPost(parseInt(postId, 10), {
        id: parseInt(postId, 10),
        ...updatedPost,
      });

      navigate("/post");
    }
  };

  return (
    <div>
      <h2>Edit Post</h2>
      <label>
        Title:
        <input
          type="text"
          name="title"
          value={updatedPost.title}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Content:
        <textarea
          name="content"
          value={updatedPost.content}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <button onClick={handleUpdatePost}>Update Post</button>
    </div>
  );
};

export default EditPost;
