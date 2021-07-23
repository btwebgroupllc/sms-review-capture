import React, { useState } from "react";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="login-screen">
      <h3>Please Signup Below</h3>
      <form>
        <input value={email} placeholder="Email Address" />
        <input value={password} placeholder="Password" />
      </form>
    </div>
  );
};

export default Signup;
