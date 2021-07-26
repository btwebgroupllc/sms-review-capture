import React, { useContext, useState } from "react";
import "../styles/ResponseContainer.css";
import ResponseContext from "../contexts/ResponseContext";

function ResponsesContainer() {
  const { text, setText } = useContext(ResponseContext);
  const [responseStrings, setResponseStrings] = useState({
    "response-string-one": "",
    "response-string-two": "",
    "response-string-three": "",
  });
  const [responseLinks, setResponseLinks] = useState({
    "response-one": "",
    "response-two": "",
    "response-three": "",
  });

  const handleChangeResponseString = (e) => {
    setResponseStrings((previousValues) => ({
      ...previousValues,
      [e.target.id]: e.target.value,
    }));

    console.log(responseStrings);
  };

  const handleChangeResponseText = (e) => {
    setResponseLinks((previousValues) => ({
      ...previousValues,
      [e.target.id]: e.target.value,
    }));

    console.log(responseLinks);
  };
  return (
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
        />
        <textarea
          placeholder="Input text here..."
          value={responseLinks["response-one"]}
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
        />
        <textarea
          placeholder="Input text here..."
          value={responseLinks["response-two"]}
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
        />
        <textarea
          placeholder="Input text here..."
          value={responseLinks["response-three"]}
          onChange={handleChangeResponseText}
          id="response-three"
        />
      </div>
      <div className="save-template">
        <input type="checkbox" id="save-template" />
        <label htmlFor="save-template">Save as template?</label>
      </div>
    </div>
  );
}

export default ResponsesContainer;
