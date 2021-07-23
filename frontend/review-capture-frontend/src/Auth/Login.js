import React, { useState } from "react";
import firebase from "../firebase";
import { toast, ToastContainer } from "react-toastify";
import "../styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const handleLogin = async (props) => {
    setBusy(true);

    try {
      await firebase.login(email, password);
      toast.success("You are now logged in!");
      props.history.push("/home");
    } catch (err) {
      toast.error("Unable to login. Please check username/password.");
    }
    setBusy(false);
  };

  return (
    <div className="login-screen">
      <div className="heading">
        <h3>Please login</h3>
      </div>

      <div className="login-form">
        <input
          value={email}
          placeholder="Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button disabled={busy} onClick={handleLogin}>
          Login
        </button>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Login;
