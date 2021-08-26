import React, { useContext, useState } from "react";
import Button from "@material-ui/core/Button";
import UserContext from "../contexts/UserContext";
import ResponseContext from "../contexts/ResponseContext";
import ResponseValuesContext from "../contexts/ResponseValuesContext";
import { handleAddTemplate, handleStartCampaign } from "../utils/utils";
import SendListContext from "../contexts/SendListContext";
import { toast, ToastContainer } from "react-toastify";
import { TextField } from "@material-ui/core";

function StartCampaignButton() {
  const { user } = useContext(UserContext);
  const { text } = useContext(ResponseContext);
  const { responseValues } = useContext(ResponseValuesContext);
  const { sendList, setSendList } = useContext(SendListContext);
  const [submitted, setSubmitted] = useState(false);
  const [isTemplate, checkIsTemplate] = useState(false);
  const [templateName, setTemplateName] = useState("");

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

    if (isTemplate) {
      if (templateName.length < 1) {
        toast.error("please enter a name.");
      } else {
        await handleAddTemplate(user.uid, campaignInfo, templateName);
        const submitting = await handleStartCampaign(
          campaignInfo,
          user.uid,
          false
        );
        setSubmitted(true);
        toast.success("Your Campaign has been started.");
      }
    } else {
      const submitting = await handleStartCampaign(
        campaignInfo,
        user.uid,
        false
      );
      setSubmitted(true);
      toast.success("Your Campaign has been started.");
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
      {isTemplate && (
        <TextField
          placeholder="Template Name:"
          value={templateName}
          onChange={(e) => setTemplateName(e.target.value)}
        />
      )}
      <ToastContainer />
    </div>
  );
}

export default StartCampaignButton;
