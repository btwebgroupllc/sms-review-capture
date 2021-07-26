import React, { useState } from "react";
import Header from "../components/Header";
import SendText from "../components/SendText";
import ResponsesContainer from "../components/ResponsesContainer";
import ResponseContext from "../contexts/ResponseContext";

const Home = () => {
  const [text, setText] = useState("");
  return (
    <div className="home">
      <h1>Welcome to Review Software</h1>
      {/*Component for first name and phone number */}
      <ResponseContext.Provider value={{ text, setText }}>
        <SendText />

        {/*Component for the three response options */}
        <ResponsesContainer />
      </ResponseContext.Provider>
    </div>
  );
};

export default Home;
