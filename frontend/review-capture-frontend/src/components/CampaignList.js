import React from "react";
import CampaignItem from "./CampaignItem";

function CampaignList({ campaigns }) {
  return (
    <div className="campaign-list">
      {campaigns.map((campaign) => (
        <CampaignItem campaign={campaign} />
      ))}
    </div>
  );
}

export default CampaignList;
