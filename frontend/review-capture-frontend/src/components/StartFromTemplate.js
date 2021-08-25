import React, { useEffect, useState, useContext } from "react";
import ResponsesContainer from "./ResponsesContainer";
import StartCampaignButton from "./StartCampaignButton";
import { handleGetTemplates } from "../utils/utils";
import UserContext from "../contexts/UserContext";

const StartFromTemplate = () => {
  const { user } = useContext(UserContext);
  const [templates, setTemplates] = useState([]);
  useEffect(() => {
    if (!user) return;
    handleSetupTemplates();
  }, []);

  const handleSetupTemplates = async () => {
    const data = await handleGetTemplates(user.uid);
    console.log(data);
    setTemplates(data);
  };
  return (
    <div className="start-template">
      <h3>Please select a template from the dropdown below.</h3>

      <ResponsesContainer />
      <StartCampaignButton />
    </div>
  );
};

export default StartFromTemplate;
