import React, { useState } from "react";
import Header from "../components/Header";
import SendText from "../components/SendText";
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
      <h1>Welcome to Review Software</h1>
      {/*Component for first name and phone number */}
      <SendListContext.Provider value={{ sendList, setSendList }}>
        <ResponseValuesContext.Provider
          value={{ responseValues, setResponseValues }}
        >
          <ResponseContext.Provider value={{ text, setText }}>
            <SendText />

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
