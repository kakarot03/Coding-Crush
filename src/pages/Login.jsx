import { Facebook, GitHub, Instagram, Twitter } from "@material-ui/icons";
import { useState } from "react";
import "./Login.css";

const Login = () => {
  const [className, setClassName] = useState("right-panel-deactive");

  // to add and remove the classList on clicking signup/signin button
  const handleClick = (props) => {
    if (props === "signup") {
      setClassName("right-panel-active");
    } else {
      setClassName("right-panel-deactive");
    }
  };

  return (
    <div>
      <h2>Sign in/up Form</h2>
      <div className={className} id="container">
        <div className="form-container sign-up-container" id="form-container">
          <form action="#">
            <h1>Create Account</h1>
            <div className="social-container">
              <a href="#" className="social">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social">
                <i className="fab fa-google-plus-g"></i>
              </a>
              <a href="#" className="social">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
            <span>or use your email for registration</span>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button>Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-in-container" id="form-container">
          <form action="#">
            <h1>Sign in</h1>
            <div className="social-container">
              <a href="#" className="social">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social">
                <i className="fab fa-google-plus-g"></i>
              </a>
              <a href="#" className="social">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
            <span>or use your account</span>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <a href="#">Forgot your password?</a>
            <button>Sign In</button>
          </form>
        </div>
        <div className="overlay-container" id="overlay-container">
          <div className="overlay" id="overlay">
            <div className="overlay-panel overlay-left" id="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <button className="ghost" id="signIn" onClick={() => handleClick("signin")}>
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right" id="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button className="ghost" id="signUp" onClick={() => handleClick("signup")}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
