import React, { useState } from "react";
import { useUserContext } from "../components/UserContext";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const { users } = useUserContext();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLogin = () => {
    setError(null);

    // Find the user with the provided email
    const user = users.find((u) => u.email === loginData.email);

    if (user && user.password === loginData.password) {
      // Successful login
      console.log("Login successful!");
      navigate("/post");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <>
      <h1>Login</h1>
      <form>
        <label>
          Email:
          <input
            type="email"
            name="email"
            className="form-control"
            value={loginData.email}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            className="form-control"
            value={loginData.password}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="button" className="btn btn-success" onClick={handleLogin}>
          Login
        </button>

        <button
          type="button"
          className="btn btn-success"
          onClick={() => navigate("/register")}
        >
          Register
        </button>
        {error && <div className="alert alert-danger">{error}</div>}
      </form>
    </>
  );
};

export default Login;
