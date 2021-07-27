import React, { useState, useEffect, useContext } from "react";
import { getActiveCampaigns } from "../utils/utils";
import UserContext from "../contexts/UserContext";
import CampaignList from "../components/CampaignList";

function Campaigns() {
  const { user } = useContext(UserContext);
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    if (!user) return;
    handleGetCampaigns();
  }, []);

  const handleGetCampaigns = async () => {
    const docCampaigns = await getActiveCampaigns(user.uid);
    setCampaigns(docCampaigns);
    console.log(docCampaigns);
  };

  return (
    <div className="campaigns">
      <h3>Your Campaigns</h3>
      <CampaignList campaigns={campaigns} />
    </div>
  );
}

export default Campaigns;
