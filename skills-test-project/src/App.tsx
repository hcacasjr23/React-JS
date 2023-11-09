import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Post from "./pages/Post/Post";
import EditPost from "./pages/Post/EditPost";
import CreatePost from "./pages/Post/CreatePost";
import { UserProvider } from "./components/UserContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/post" element={<Post />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/edit-post/:postId" element={<EditPost />} />
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
