import React, { useState } from "react";
import { useUserContext } from "../../components/UserContext";
import { useNavigate } from "react-router-dom";

const CreatePost: React.FC = () => {
  const { createPost } = useUserContext();
  const navigate = useNavigate();

  const [newPost, setNewPost] = useState({ title: "", content: "" });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewPost((prevPost) => ({ ...prevPost, [name]: value }));
  };

  const handleCreatePost = () => {
    createPost(newPost.title, newPost.content);
    // Redirect to the post page after creating the post
    navigate("/post");
  };

  return (
    <div>
      <h2>Create Post</h2>
      <label>
        Title:
        <input
          type="text"
          name="title"
          value={newPost.title}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Content:
        <textarea
          name="content"
          value={newPost.content}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <button onClick={handleCreatePost}>Create Post</button>
    </div>
  );
};

export default CreatePost;
