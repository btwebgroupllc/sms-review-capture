import React, { useState } from "react";
import Header from "../components/Header";
import ResponsesContainer from "../components/ResponsesContainer";
import ResponseContext from "../contexts/ResponseContext";
import ResponseValuesContext from "../contexts/ResponseValuesContext";
import StartCampaignButton from "../components/StartCampaignButton";
import SendListContext from "../contexts/SendListContext";

const Home = () => {
  const [text, setText] = useState("");
  const [sendList, setSendList] = useState([]);
  const [responseValues, setResponseValues] = useState({});
  return (
    <div className="home">
      <div
        className="hero"
        style={{ backgroundColor: "#2a9d8f", padding: "100px" }}
      >
        <h1 style={{ color: "white", margin: "0", padding: "0" }}>
          Welcome to Review Software
        </h1>
        <p style={{ color: "white" }}>
          Start a new campaign below, or go to the Campaigns Tab to view all of
          your campaigns.
        </p>
      </div>
      {/*Component for first name and phone number */}
      <SendListContext.Provider value={{ sendList, setSendList }}>
        <ResponseValuesContext.Provider
          value={{ responseValues, setResponseValues }}
        >
          <ResponseContext.Provider value={{ text, setText }}>
            {/*Component for the three response options */}
            <ResponsesContainer />
            <StartCampaignButton />
          </ResponseContext.Provider>
        </ResponseValuesContext.Provider>
      </SendListContext.Provider>
    </div>
  );
};

export default Home;
