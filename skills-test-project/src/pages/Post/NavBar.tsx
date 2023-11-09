import React from "react";
import { Link } from "react-router-dom";

interface NavbarProps {
  username: string;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ username, onLogout }) => {
  return (
    <nav>
      <div>
        <span>Hi, {username}!</span>
      </div>
      <div>
        <Link to="/">Home</Link>
        <button onClick={onLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
