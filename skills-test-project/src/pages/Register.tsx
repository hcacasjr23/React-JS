import React, { useState } from "react";
import { useUserContext } from "../components/UserContext";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const { addUser } = useUserContext();
  const navigate = useNavigate();

  // Hooks
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errorMessages, setErrorMessages] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInput = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleRegister = async () => {
    try {
      // Clear all previous error messages
      setErrorMessages({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      if (!formData.username) {
        setErrorMessages((prevErrors) => ({
          ...prevErrors,
          username: "Username is required",
        }));
      }

      if (!formData.email) {
        setErrorMessages((prevErrors) => ({
          ...prevErrors,
          email: "Email is required",
        }));
      }

      if (!formData.password) {
        setErrorMessages((prevErrors) => ({
          ...prevErrors,
          password: "Password is required",
        }));
      }

      if (formData.password !== formData.confirmPassword) {
        setErrorMessages((prevErrors) => ({
          ...prevErrors,
          confirmPassword: "Passwords don't match",
        }));
        return; // Stop registration if passwords don't match
      }

      // Check if input fields are empty if ! then add users
      if (
        formData.password !== "" &&
        formData.username !== "" &&
        formData.username !== ""
      ) {
        addUser({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        });
        // Redirect to login page
        navigate("/login");

        // Checker if register successful
        console.log("registration successful");
      }

      console.log(
        "Username: " + formData.username,
        "\nEmail: " + formData.email,
        "\nPassword: " + formData.password,
        "\nConfirmed Password: " + formData.confirmPassword
      );
    } catch (error: any) {
      console.error("Error during registration", error.message);
    }
  };

  return (
    <>
      <h1>Register</h1>
      <h6>See the Registration Rules</h6>
      <form>
        {/* Username */}
        <label>
          Username
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            name="username"
            value={formData.username}
            onChange={handleInput}
          />
          {/* Error message when username field is empty */}
          {errorMessages.username && (
            <div className="alert alert-danger">{errorMessages.username}</div>
          )}
        </label>
        <br />

        {/* Email Address */}
        <label>
          Email Address
          <input
            type="email"
            className="form-control"
            placeholder="Enter Email"
            name="email"
            value={formData.email}
            onChange={handleInput}
          />
          {/* Error message when email field is empty */}
          {errorMessages.email && (
            <div className="alert alert-danger">{errorMessages.email}</div>
          )}
        </label>
        <br />

        {/* Password */}
        <label>
          Password
          <input
            type="password"
            className="form-control"
            placeholder="Enter Password"
            name="password"
            value={formData.password}
            onChange={handleInput}
            autoComplete="new-password"
          />
          {/* Error message when password field is empty */}
          {errorMessages.password && (
            <div className="alert alert-danger">{errorMessages.password}</div>
          )}
        </label>
        <br />

        {/* Confirm Password */}
        <label>
          Confirm Password
          <input
            type="password"
            className="form-control"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInput}
            autoComplete="new-password"
          />
          {/* Error message when confirm password field is != password field */}
          {errorMessages.confirmPassword && (
            <div className="alert alert-danger">
              {errorMessages.confirmPassword}
            </div>
          )}
        </label>
        <br />

        {/* Register Button */}
        <button
          type="button"
          onClick={handleRegister}
          className="btn btn-success"
        >
          Register
        </button>
        <p>
          Return to the <Link to="/login">LOGIN PAGE</Link>
        </p>
      </form>
    </>
  );
};
export default Register;
