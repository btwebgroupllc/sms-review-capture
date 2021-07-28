import React, { useContext, useState } from "react";
import Button from "@material-ui/core/Button";
import UserContext from "../contexts/UserContext";
import ResponseContext from "../contexts/ResponseContext";
import ResponseValuesContext from "../contexts/ResponseValuesContext";
import { handleStartCampaign } from "../utils/utils";
import SendListContext from "../contexts/SendListContext";

function StartCampaignButton() {
  const { user } = useContext(UserContext);
  const { text } = useContext(ResponseContext);
  const { responseValues } = useContext(ResponseValuesContext);
  const { sendList, setSendList } = useContext(SendListContext);

  const getDataAndSubmit = async () => {
    const campaignInfo = {
      initial_text: text,
      userId: user.uid,
      phoneNumbers: sendList,
      responseOne: {
        responseString: responseValues["response-string-one"],
        responseText: responseValues["response-one"],
      },
      responseTwo: {
        responseString: responseValues["response-string-two"],
        responseText: responseValues["response-two"],
      },
      responseThree: {
        responseString: responseValues["response-string-three"],
        responseText: responseValues["response-three"],
      },
      status: "active",
    };

    console.log(campaignInfo);
    const submitting = await handleStartCampaign(campaignInfo, user.uid, false);
  };
  return (
    <div className="start-campaign-button">
      <Button color="primary" variant="contained" onClick={getDataAndSubmit}>
        Start Campaign
      </Button>
    </div>
  );
}

export default StartCampaignButton;
