import { createContext, useContext, FC, ReactNode, useState } from "react";

interface User {
  username: string;
  email: string;
  password: string;
}

interface Post {
  id: number;
  title: string;
  content: string;
}

interface UserContextProps {
  users: User[];
  posts: Post[];
  addUser: (user: User) => void;
  addPost: (post: Post) => void;
  editPost: (postId: number, updatedPost: Post) => void;
  deletePost: (postId: number) => void;
  createPost: (title: string, content: string) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }

  return context;
};

export const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);

  const addUser = (user: User) => {
    setUsers((prevUsers) => [...prevUsers, user]);
  };

  const addPost = (post: Post) => {
    setPosts((prevPosts) => [...prevPosts, post]);
  };

  const editPost = (postId: number, updatedPost: Post) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, ...updatedPost } : post
      )
    );
  };

  const deletePost = (postId: number) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  const createPost = (title: string, content: string) => {
    const newPost: Post = {
      id: posts.length > 0 ? posts[posts.length - 1].id + 1 : 1,
      title,
      content,
    };
    addPost(newPost);
  };

  return (
    <UserContext.Provider
      value={{
        users,
        posts,
        addUser,
        addPost,
        editPost,
        deletePost,
        createPost,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
