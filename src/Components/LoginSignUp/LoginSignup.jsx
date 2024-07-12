import React, { useState } from "react";
import "./LoginSignup.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useLoginMutation, useRegisterMutation } from "../../js/login"; 

const LoginSignup = () => {
  const [action, setAction] = useState("Login");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "", 
    lastName: "", 
  });
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const loginMutation = useLoginMutation();
  const registerMutation = useRegisterMutation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    if (name === "email") {
      setEmailError(!isValidEmail(value));
    }

    if (name === "password") {
      setPasswordError(value.length < 6);
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
    if (!emailError && !passwordError) {
      try {
        if (action === "Login") {
          const accessToken = await loginMutation.mutateAsync(formData);
          localStorage.setItem("accessToken", accessToken);
          console.log(`User logged in!`);
          navigate("/home");
        } else if (action === "Sign Up") {
          const response = await registerMutation.mutateAsync(formData);
          console.log("Registration successful. Response:", response);
          navigate("/login");
        }
      } catch (error) {
        console.error("Error:", error);
        setErrorMessage(error.response?.data?.message || "An error occurred");
      } finally {
        setFormData({ email: "", password: "", firstName: "", lastName: "" });
      }
    }
  };

  return (
    <div className="container">
      <div className="form">
        <div className="image-container">
          <h1>Meal MasterMind</h1>
          <p>
            Explore hundreds of recipes, ingredients, and interesting articles.
            Let's save tons of food together!
          </p>
        </div>
        <div className="formInfoContainer">
          <div className="header">
            <div className="text">
              {action === "Login" ? "Log in" : "Sign up"}
            </div>
            <div className="underline"></div>
          </div>
          <div className="inputs">
            {action === "Sign Up" && (
              <>
                <div className="input">
                  <FontAwesomeIcon className="input-icon" icon={faUser} />
                  <input
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="input">
                  <FontAwesomeIcon className="input-icon" icon={faUser} />
                  <input
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                </div>
              </>
            )}
            <div className="input">
              <FontAwesomeIcon className="input-icon" icon={faEnvelope} />
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            {emailError && (
              <div className="error-message">
                Please enter a valid email address.
              </div>
            )}
            <div className="input">
              <FontAwesomeIcon className="input-icon" icon={faLock} />
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
            {passwordError && (
              <div className="error-message">
                Password must be at least 6 characters long.
              </div>
            )}
            {errorMessage && (
              <div className="error-message">{errorMessage}</div>
            )}
          </div>
          <div className="submit-container">
            <div
              className={action === "Login" ? "submit gray" : "submit"}
              onClick={() => {
                setAction("Sign Up");
              }}
            >
              Sign up
            </div>
            <div
              className={action === "Sign Up" ? "submit gray" : "submit"}
              onClick={() => {
                setAction("Login");
              }}
            >
              Log in
            </div>
          </div>
          <div className="submitButtonContainer">
            <div className="submitButton" onClick={handleSubmit}>
              Submit
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
