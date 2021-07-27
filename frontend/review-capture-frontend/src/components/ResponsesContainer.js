import React, { useContext, useState, useEffect } from "react";
import "../styles/ResponseContainer.css";
import ResponseContext from "../contexts/ResponseContext";
import ResponseValuesContext from "../contexts/ResponseValuesContext";
import UserContext from "../contexts/UserContext";
import { getCurrentCampaign } from "../utils/utils";
function ResponsesContainer() {
  const { text, setText } = useContext(ResponseContext);
  const { user } = useContext(UserContext);
  const [currentCampaign, setCurrentCampaign] = useState({});
  const { responseValues, setResponseValues } = useContext(
    ResponseValuesContext
  );

  useEffect(() => {
    if (!user) return;
    handleCampaignSetup();
  }, []);

  const handleCampaignSetup = async () => {
    const activeCampaign = await getCurrentCampaign(user.uid);
    setText(activeCampaign.initial_text);
    setResponseValues((previousValues) => ({
      ...previousValues,
      "response-string-one": activeCampaign.response_one.response_string,
      "response-string-two": activeCampaign.response_two.response_string,
      "response-string-three": activeCampaign.response_three.response_string,
      "response-one": activeCampaign.response_one.response_text,
      "response-two": activeCampaign.response_two.response_text,
      "response-three": activeCampaign.response_three.response_text,
    }));
    console.log(activeCampaign);
  };
  const handleChangeResponseString = (e) => {
    setResponseValues((previousValues) => ({
      ...previousValues,
      [e.target.id]: e.target.value,
    }));

    console.log(responseValues);
  };

  const handleChangeResponseText = (e) => {
    setResponseValues((previousValues) => ({
      ...previousValues,
      [e.target.id]: e.target.value,
    }));

    console.log(responseValues);
  };
  return (
    <>
      <h3>Your Current Active campaign </h3>
      <div className="responses-container">
        <div className="response text-content">
          <h4>What would you like the text to say?</h4>
          <textarea
            placeholder="Input text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="response response-1">
          <h4>Response 1</h4>
          <input
            placeholder="Response String..."
            id="response-string-one"
            onChange={handleChangeResponseString}
            value={responseValues["response-string-one"]}
          />
          <textarea
            placeholder="Input text here..."
            value={responseValues["response-one"]}
            id="response-one"
            onChange={handleChangeResponseText}
          />
        </div>
        <div className="response response-2">
          <h4>Response 2</h4>
          <input
            placeholder="Response String..."
            id="response-string-two"
            onChange={handleChangeResponseString}
            value={responseValues["response-string-two"]}
          />
          <textarea
            placeholder="Input text here..."
            value={responseValues["response-two"]}
            onChange={handleChangeResponseText}
            id="response-two"
          />
        </div>
        <div className="response response-3">
          <h4>Response 3</h4>
          <input
            placeholder="Response String..."
            id="response-string-three"
            onChange={handleChangeResponseString}
            value={responseValues["response-string-three"]}
          />
          <textarea
            placeholder="Input text here..."
            value={responseValues["response-three"]}
            onChange={handleChangeResponseText}
            id="response-three"
          />
        </div>
        <div className="save-template">
          <input type="checkbox" id="save-template" />
          <label htmlFor="save-template">Save as template?</label>
        </div>
      </div>
    </>
  );
}

export default ResponsesContainer;
