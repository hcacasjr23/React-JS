import React from "react";
import Navbar from "./NavBar";
import { useUserContext } from "../../components/UserContext";
import { useNavigate } from "react-router-dom";

interface Post {
  id: number;
  title: string;
  content: string;
}

const Post: React.FC = () => {
  const { users, posts, deletePost, editPost, createPost } = useUserContext();
  const navigate = useNavigate();

  const handleDelete = (postId: number) => {
    deletePost(postId);
  };

  const handleEdit = (postId: number) => {
    navigate("/edit-post/${postId}");
  };

  const handleCreatePost = () => {
    navigate("/create-post");
    console.log("Create Post");
    // createPost("New Post", "New Post Content");
  };

  const currentUser = users.find((u) => u.username);
  const username = currentUser ? currentUser.username : "User";

  const handleLogout = () => {
    console.log("Logout");
  };

  return (
    <div>
      <Navbar username={username} onLogout={handleLogout} />

      <h2>Post Page</h2>

      <button onClick={handleCreatePost}>Create Post</button>

      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <button onClick={() => handleEdit(post.id)}>Edit</button>
            <button onClick={() => handleDelete(post.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Post;
