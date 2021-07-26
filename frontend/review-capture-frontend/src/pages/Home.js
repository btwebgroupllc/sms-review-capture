import React, { useState } from "react";
import Header from "../components/Header";
import SendText from "../components/SendText";
import ResponsesContainer from "../components/ResponsesContainer";
import ResponseContext from "../contexts/ResponseContext";
import ResponseValuesContext from "../contexts/ResponseValuesContext";

const Home = () => {
  const [text, setText] = useState("");
  const [responseValues, setResponseValues] = useState({});
  return (
    <div className="home">
      <h1>Welcome to Review Software</h1>
      {/*Component for first name and phone number */}
      <ResponseValuesContext.Provider
        value={{ responseValues, setResponseValues }}
      >
        <ResponseContext.Provider value={{ text, setText }}>
          <SendText />

          {/*Component for the three response options */}
          <ResponsesContainer />
        </ResponseContext.Provider>
      </ResponseValuesContext.Provider>
    </div>
  );
};

export default Home;
