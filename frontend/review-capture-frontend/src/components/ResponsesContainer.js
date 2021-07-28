import React, { useContext, useState, useEffect } from "react";
import "../styles/ResponseContainer.css";
import ResponseContext from "../contexts/ResponseContext";
import ResponseValuesContext from "../contexts/ResponseValuesContext";
import UserContext from "../contexts/UserContext";
import { TextField, Card, CardContent, CardHeader } from "@material-ui/core";
import { getMostRecentCampaign } from "../utils/utils";
import SendText from "./SendText";
function ResponsesContainer() {
  const { text, setText } = useContext(ResponseContext);
  const { user } = useContext(UserContext);
  const { responseValues, setResponseValues } = useContext(
    ResponseValuesContext
  );

  useEffect(() => {
    if (!user) return;
    handleCampaignSetup();
  }, []);

  const handleCampaignSetup = async () => {
    const activeCampaign = await getMostRecentCampaign(user.uid);
    setText(activeCampaign.initial_text);
    setResponseValues((previousValues) => ({
      ...previousValues,
      "response-string-one": activeCampaign.response_one.response_string,
      "response-string-two": activeCampaign.response_two.response_string,
      "response-string-three": activeCampaign.response_three.response_string,
      "response-one": activeCampaign.response_one.response_text,
      "response-two": activeCampaign.response_two.response_text,
      "response-three": activeCampaign.response_three.response_text,
      "error-response": activeCampaign.error_response,
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

  const cardStyle = {};
  return (
    <div
      style={{
        marginTop: "50px",
        paddingTop: "20px",
      }}
    >
      <h2 style={{ color: "white" }}>Start a New Campaign </h2>
      <SendText />
      <div className="responses-container">
        <div className="response text-content">
          <Card style={cardStyle}>
            <CardHeader title="What would you like the text to say?" />
            <CardContent>
              <TextField
                label="Input text here..."
                variant="outlined"
                value={text}
                onChange={(e) => setText(e.target.value)}
                fullWidth
                multiline
                rows={6}
                maxRows={10}
                focused
              />
            </CardContent>
          </Card>
        </div>
        <div className="response response-1">
          <Card>
            <CardHeader title="Response 1" />
            <CardContent>
              <TextField
                label="Response String"
                variant="outlined"
                id="response-string-one"
                onChange={handleChangeResponseString}
                value={responseValues["response-string-one"]}
                fullWidth
                focused
              />
              <div style={{ padding: "10px" }} />
              <TextField
                label="Input text here..."
                value={responseValues["response-one"]}
                id="response-one"
                onChange={handleChangeResponseText}
                fullWidth
                multiline
                rows={6}
                maxRows={10}
                variant="outlined"
                focused
              />
            </CardContent>
          </Card>
        </div>
        <div className="response response-2">
          <Card>
            <CardHeader title="Response 2" />
            <CardContent>
              <TextField
                variant="outlined"
                label="Response String"
                id="response-string-two"
                onChange={handleChangeResponseString}
                value={responseValues["response-string-two"]}
                fullWidth
                focused
              />
              <div style={{ padding: "10px" }} />
              <TextField
                label="Input text here..."
                focused
                value={responseValues["response-two"]}
                onChange={handleChangeResponseText}
                id="response-two"
                multiline
                variant="outlined"
                fullWidth
                rows={6}
                maxRows={10}
              />
            </CardContent>
          </Card>
        </div>
        <div className="response response-3">
          <Card>
            <CardHeader title="Response 3" />
            <CardContent>
              <TextField
                variant="outlined"
                label="Response String"
                id="response-string-three"
                onChange={handleChangeResponseString}
                value={responseValues["response-string-three"]}
                fullWidth
                focused
              />
              <div style={{ padding: "10px" }} />
              <TextField
                label="Input text here..."
                value={responseValues["response-three"]}
                onChange={handleChangeResponseText}
                id="response-three"
                variant="outlined"
                multiline
                fullWidth
                rows={6}
                maxRows={10}
                focused
              />
            </CardContent>
          </Card>
        </div>

        {/*<div className="response text-content">
          <h4>What to say if they enter an incorrect command?</h4>
          <textarea
            placeholder="Input text here..."
            value={responseValues["error-response"]}
            onChange={handleChangeResponseText}
            id="error-response"
          />
  </div> */}
        <div className="save-template">
          <input type="checkbox" id="save-template" />
          <label htmlFor="save-template">Save as template?</label>
        </div>
      </div>
    </div>
  );
}

export default ResponsesContainer;
