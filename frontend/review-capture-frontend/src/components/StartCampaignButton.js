import React, { useContext, useState } from "react";
import Button from "@material-ui/core/Button";
import UserContext from "../contexts/UserContext";
import ResponseContext from "../contexts/ResponseContext";
import ResponseValuesContext from "../contexts/ResponseValuesContext";
import { handleAddTemplate, handleStartCampaign } from "../utils/utils";
import SendListContext from "../contexts/SendListContext";
import { toast, ToastContainer } from "react-toastify";

function StartCampaignButton() {
  const { user } = useContext(UserContext);
  const { text } = useContext(ResponseContext);
  const { responseValues } = useContext(ResponseValuesContext);
  const { sendList, setSendList } = useContext(SendListContext);
  const [submitted, setSubmitted] = useState(false);
  const [isTemplate, checkIsTemplate] = useState(false);

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
    setSubmitted(true);
    toast.success("Your Campaign has been started.");
    if (isTemplate) {
      await handleAddTemplate(user.uid, campaignInfo);
    }
  };
  return (
    <div className="start-campaign-button" style={{ paddingBottom: "50px" }}>
      <Button
        disabled={submitted}
        color="primary"
        variant="contained"
        onClick={getDataAndSubmit}
      >
        Start Campaign
      </Button>
      <div className="save-template" style={{ padding: "10px" }}>
        <input
          type="checkbox"
          id="save-template"
          checked={isTemplate}
          onChange={(e) => checkIsTemplate(e.target.checked)}
        />
        <label htmlFor="save-template">Save as template?</label>
      </div>
      <ToastContainer />
    </div>
  );
}

export default StartCampaignButton;
