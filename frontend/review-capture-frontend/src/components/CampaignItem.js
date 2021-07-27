import React from "react";
import { Card, CardContent } from "@material-ui/core";

function CampaignItem({ campaign }) {
  return (
    <div
      className="campaign-item"
      style={{
        margin: "5px",
        width: "75%",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <Card>
        <CardContent>
          <p>Campaign ID: {campaign.campaign_id}</p>
          <p>Initial Text: {campaign.initial_text}</p>
          <p>Status: {campaign.status}</p>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "50%",
              marginLeft: "350px",
            }}
          >
            <p>View More Info</p>
            <p>View People In Campaign</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default CampaignItem;
